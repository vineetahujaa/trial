export async function onRequestGet({ env, request, data }) {
  const userId = data.userId;
  const url = new URL(request.url);
  const limit = clampInt(url.searchParams.get('limit'), 25, 1, 100);
  const res = await env.DB.prepare(`SELECT id, batch_id, issue_type, severity, equipment, recommended_action, notes, created_at_ms
     FROM incidents WHERE user_id=? ORDER BY created_at_ms DESC LIMIT ?`)
     .bind(userId, limit)
     .all();
  return json({ incidents: res.results || [] });
}

export async function onRequestPost({ env, request, data }) {
  if (!(request.headers.get('Content-Type') || '').includes('application/json')) {
    return json({ error: 'Content-Type must be application/json' }, 415);
  }

  const body = await request.json();
  const text = String(body.text || '').trim();
  let batchId = String(body.batchId || '').trim() || null;
  const userId = data.userId;

  if (!text) return json({ error: 'text is required' }, 422);

  if (batchId) {
    const batchRes = await env.DB.prepare('SELECT id FROM batches WHERE id=? AND user_id=?').bind(batchId, userId).all();
    if (!batchRes.results?.length) batchId = null;
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: env.GROQ_EXTRACT_MODEL || 'openai/gpt-oss-20b',
      temperature: 0.1,
      max_completion_tokens: 400,
      messages: [
        { role: 'system', content: 'Extract a factory incident from the user\'s text. Return only JSON matching the provided schema. If data is missing, use empty string and lower confidence.' },
        { role: 'user', content: text },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'incident',
          strict: true,
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: {
              issue_type: { type: 'string' },
              severity: { type: 'string', enum: ['low', 'medium', 'high', 'critical'] },
              equipment: { type: 'string' },
              batch_number_hint: { type: 'string' },
              recommended_action: { type: 'string' },
              notes: { type: 'string' },
              confidence: { type: 'number' },
              tags: { type: 'array', items: { type: 'string' } }
            },
            required: ['issue_type', 'severity', 'equipment', 'recommended_action', 'notes', 'confidence', 'tags']
          }
        }
      }
    }),
  });

  if (response.status === 429) {
    return json({ error: 'Groq rate limited', retryAfter: response.headers.get('retry-after') || '2' }, 429);
  }
  if (!response.ok) {
    return json({ error: 'Groq error', details: await response.text() }, 502);
  }

  const payload = await response.json();
  const raw = payload?.choices?.[0]?.message?.content || '{}';
  let extracted;
  try {
    extracted = JSON.parse(raw);
  } catch {
    return json({ error: 'Failed to parse model JSON', raw: raw.slice(0, 1000) }, 502);
  }

  if (!batchId && extracted?.batch_number_hint) {
    const batchNumber = String(extracted.batch_number_hint || '').trim().toUpperCase();
    if (/^[A-Z0-9-]{3,32}$/.test(batchNumber)) {
      const batchRes = await env.DB.prepare('SELECT id FROM batches WHERE user_id=? AND batch_number=?').bind(userId, batchNumber).all();
      if (batchRes.results?.[0]?.id) batchId = batchRes.results[0].id;
    }
  }

  const id = crypto.randomUUID();
  const now = Date.now();
  await env.DB.prepare(`INSERT INTO incidents
    (id, user_id, batch_id, issue_type, severity, equipment, recommended_action, notes, raw_text, structured_json, created_at_ms)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(
      id,
      userId,
      batchId,
      String(extracted.issue_type || '').slice(0, 200),
      String(extracted.severity || 'low').slice(0, 20),
      String(extracted.equipment || '').slice(0, 200),
      String(extracted.recommended_action || '').slice(0, 800),
      String(extracted.notes || '').slice(0, 1000),
      text,
      JSON.stringify(extracted),
      now
    )
    .run();

  return json({
    incident: {
      id,
      batch_id: batchId,
      issue_type: extracted.issue_type,
      severity: extracted.severity,
      equipment: extracted.equipment,
      recommended_action: extracted.recommended_action,
      notes: extracted.notes,
      created_at_ms: now,
    },
    extracted,
  }, 201);
}

function clampInt(val, d, min, max) {
  const n = parseInt(val ?? '', 10);
  return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : d;
}
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });
}
