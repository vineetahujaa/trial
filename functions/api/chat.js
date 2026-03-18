export async function onRequestGet({ env, request, data }) {
  const userId = data.userId;
  const url = new URL(request.url);
  const conversationId = (url.searchParams.get('conversationId') || 'plant-ai').slice(0, 50);
  const limit = clampInt(url.searchParams.get('limit'), 80, 1, 200);

  const res = await env.DB.prepare(`SELECT id, role, content, created_at_ms
     FROM chat_messages WHERE user_id=? AND conversation_id=?
     ORDER BY created_at_ms ASC LIMIT ?`)
     .bind(userId, conversationId, limit)
     .all();

  return json({ messages: res.results || [] });
}

export async function onRequestPost({ env, request, data }) {
  if (!(request.headers.get('Content-Type') || '').includes('application/json')) {
    return json({ error: 'Content-Type must be application/json' }, 415);
  }

  const body = await request.json();
  const userId = data.userId;
  const conversationId = String(body.conversationId || 'plant-ai').slice(0, 50);
  const message = String(body.message || '').trim();
  if (!message) return json({ error: 'message is required' }, 422);

  const userMessageId = crypto.randomUUID();
  const now = Date.now();
  await env.DB.prepare(`INSERT INTO chat_messages (id, user_id, conversation_id, role, content, created_at_ms)
    VALUES (?, ?, ?, 'user', ?, ?)`)
    .bind(userMessageId, userId, conversationId, message, now)
    .run();

  const historyRes = await env.DB.prepare(`SELECT role, content FROM chat_messages
    WHERE user_id=? AND conversation_id=? ORDER BY created_at_ms DESC LIMIT 20`)
    .bind(userId, conversationId)
    .all();
  const history = (historyRes.results || []).reverse();

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: env.GROQ_CHAT_MODEL || 'llama-3.3-70b-versatile',
      temperature: 0.2,
      max_completion_tokens: 800,
      messages: [
        {
          role: 'system',
          content: 'You are YieldPe Plant AI. Be concise, operational, and numeric where possible. When the user asks about batches, tracking, incidents, yields, or compliance, answer with steps and checks. If information is missing, ask one clarifying question.',
        },
        ...history,
      ],
    }),
  });

  if (response.status === 429) {
    return json({ error: 'Groq rate limited', retryAfter: response.headers.get('retry-after') || '2' }, 429);
  }
  if (!response.ok) {
    return json({ error: 'Groq error', details: await response.text() }, 502);
  }

  const payload = await response.json();
  const assistantText = payload?.choices?.[0]?.message?.content?.trim() || 'No response generated.';
  const assistantMessageId = crypto.randomUUID();
  const assistantNow = Date.now();

  await env.DB.prepare(`INSERT INTO chat_messages (id, user_id, conversation_id, role, content, created_at_ms)
    VALUES (?, ?, ?, 'assistant', ?, ?)`)
    .bind(assistantMessageId, userId, conversationId, assistantText, assistantNow)
    .run();

  return json({
    userMessage: { id: userMessageId, role: 'user', content: message, created_at_ms: now },
    assistantMessage: { id: assistantMessageId, role: 'assistant', content: assistantText, created_at_ms: assistantNow },
  });
}

function clampInt(val, d, min, max) {
  const n = parseInt(val ?? '', 10);
  return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : d;
}
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });
}
