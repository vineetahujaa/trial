export async function onRequestGet({ env, request, data }) {
  const userId = data.userId;
  const url = new URL(request.url);
  const limit = clampInt(url.searchParams.get('limit'), 25, 1, 100);
  const cursor = url.searchParams.get('cursor');

  let where = 'WHERE user_id = ?';
  const bind = [userId];

  if (cursor) {
    const [msStr, id] = cursor.split(':');
    const ms = Number(msStr);
    if (!Number.isFinite(ms) || !id) return json({ error: 'Invalid cursor' }, 400);
    where += ' AND (created_at_ms < ? OR (created_at_ms = ? AND id < ?))';
    bind.push(ms, ms, id);
  }

  const sql = `
    SELECT id, batch_number, source, battery_type, form_factor, intake_weight_kg, intake_date, created_at_ms
    FROM batches
    ${where}
    ORDER BY created_at_ms DESC, id DESC
    LIMIT ?
  `;

  const res = await env.DB.prepare(sql).bind(...bind, limit + 1).all();
  const rows = res.results || [];
  const hasMore = rows.length > limit;
  const items = hasMore ? rows.slice(0, limit) : rows;
  const nextCursor = hasMore && items.length
    ? `${items[items.length - 1].created_at_ms}:${items[items.length - 1].id}`
    : null;

  return json({ items, nextCursor });
}

export async function onRequestPost({ env, request, data }) {
  if (!(request.headers.get('Content-Type') || '').includes('application/json')) {
    return json({ error: 'Content-Type must be application/json' }, 415);
  }

  const body = await safeJson(request);
  if (!body) return json({ error: 'Invalid JSON' }, 400);

  const userId = data.userId;
  const batchNumber = String(body.batchNumber || '').trim().toUpperCase();
  if (!/^[A-Z0-9-]{3,32}$/.test(batchNumber)) return json({ error: 'Invalid batchNumber' }, 422);

  const source = cut(body.source, 200);
  const batteryType = cut(body.batteryType, 100);
  const formFactor = cut(body.formFactor, 100);
  const intakeWeightKg = body.intakeWeightKg === null || body.intakeWeightKg === undefined || body.intakeWeightKg === ''
    ? null
    : Number(body.intakeWeightKg);
  if (intakeWeightKg !== null && (!Number.isFinite(intakeWeightKg) || intakeWeightKg < 0)) {
    return json({ error: 'intakeWeightKg must be a positive number' }, 422);
  }

  const intakeDate = String(body.intakeDate || '').trim();
  if (intakeDate && !/^\d{4}-\d{2}-\d{2}$/.test(intakeDate)) {
    return json({ error: 'intakeDate must be YYYY-MM-DD' }, 422);
  }

  const id = crypto.randomUUID();
  const now = Date.now();

  try {
    await env.DB.prepare(`INSERT INTO batches
      (id, user_id, batch_number, source, battery_type, form_factor, intake_weight_kg, intake_date, created_at_ms, updated_at_ms)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(id, userId, batchNumber, source || null, batteryType || null, formFactor || null, intakeWeightKg, intakeDate || null, now, now)
      .run();
  } catch (error) {
    return json({ error: 'Batch already exists', details: String(error) }, 409);
  }

  const row = await env.DB.prepare(`SELECT id, batch_number, source, battery_type, form_factor, intake_weight_kg, intake_date, created_at_ms
      FROM batches WHERE id=? AND user_id=?`).bind(id, userId).all();

  return json({ item: row.results?.[0] || null }, 201);
}

async function safeJson(request) {
  try { return await request.json(); } catch { return null; }
}
function clampInt(val, d, min, max) {
  const n = parseInt(val ?? '', 10);
  return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : d;
}
function cut(v, max) {
  const s = String(v || '').trim();
  return s ? s.slice(0, max) : '';
}
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });
}
