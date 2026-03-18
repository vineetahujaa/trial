export async function onRequestPost({ env, request, data }) {
  const form = await request.formData();
  const file = form.get('file');
  const batchId = String(form.get('batchId') || '').trim() || null;
  const userId = data.userId;

  if (!file || typeof file.arrayBuffer !== 'function') return json({ error: 'Missing file field' }, 422);

  if (batchId) {
    const batch = await env.DB.prepare('SELECT id FROM batches WHERE id=? AND user_id=?').bind(batchId, userId).all();
    if (!batch.results?.length) return json({ error: 'Invalid batchId' }, 404);
  }

  const maxBytes = env.MAX_UPLOAD_BYTES ? Number(env.MAX_UPLOAD_BYTES) : 25 * 1024 * 1024;
  if (Number.isFinite(maxBytes) && file.size > maxBytes) {
    return json({ error: `File too large. Max ${maxBytes} bytes.` }, 413);
  }

  const id = crypto.randomUUID();
  const safeName = sanitizeFilename(file.name || 'upload.bin');
  const key = buildObjectKey(batchId, id, safeName);

  await env.BUCKET.put(key, file.stream(), {
    httpMetadata: { contentType: file.type || 'application/octet-stream' },
    customMetadata: {
      original_filename: safeName,
      user_id: userId,
      batch_id: batchId || '',
    },
  });

  await env.DB.prepare(`INSERT INTO files
    (id, user_id, batch_id, object_key, original_filename, content_type, size_bytes, created_at_ms)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(id, userId, batchId, key, safeName, file.type || null, Number(file.size) || null, Date.now())
    .run();

  return json({
    file: {
      id,
      batch_id: batchId,
      original_filename: safeName,
      content_type: file.type || null,
      size_bytes: file.size,
      downloadUrl: `/api/upload?fileId=${encodeURIComponent(id)}`,
    },
  }, 201);
}

export async function onRequestGet({ env, request, data }) {
  const url = new URL(request.url);
  const fileId = url.searchParams.get('fileId');
  if (!fileId) return json({ error: 'fileId is required' }, 400);

  const rowRes = await env.DB.prepare('SELECT id, object_key, original_filename FROM files WHERE id=? AND user_id=?')
    .bind(fileId, data.userId)
    .all();
  const row = rowRes.results?.[0];
  if (!row) return json({ error: 'Not found' }, 404);

  const object = await env.BUCKET.get(row.object_key);
  if (!object || !object.body) return json({ error: 'Not found in storage' }, 404);

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('Content-Disposition', `attachment; filename="${row.original_filename.replace(/"/g, '')}"`);
  headers.set('X-Content-Type-Options', 'nosniff');

  return new Response(object.body, { status: 200, headers });
}

function sanitizeFilename(name) {
  return name.replace(/[^\w.\- ()]/g, '_').replace(/\s+/g, ' ').trim().slice(0, 180);
}
function buildObjectKey(batchId, id, filename) {
  const d = new Date();
  const yyyy = String(d.getUTCFullYear());
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  return `uploads/${yyyy}/${mm}/${dd}/${batchId ? `batch_${batchId}` : 'unassigned'}/${id}-${filename}`;
}
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });
}
