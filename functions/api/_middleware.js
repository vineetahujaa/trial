import { verifyToken } from '@clerk/backend';

export const onRequest = [async (context) => {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(request, env) });
  }

  const token = extractBearerToken(request) || extractSessionCookie(request);
  if (!token) {
    return json({ error: 'Unauthorized' }, 401, corsHeaders(request, env));
  }

  try {
    const { payload } = await verifyToken(token, {
      jwtKey: env.CLERK_JWT_KEY,
      authorizedParties: env.CLERK_AUTHORIZED_PARTIES
        ? env.CLERK_AUTHORIZED_PARTIES.split(',').map((s) => s.trim()).filter(Boolean)
        : undefined,
    });

    const userId = payload?.sub;
    if (!userId) {
      return json({ error: 'Unauthorized' }, 401, corsHeaders(request, env));
    }

    context.data.userId = userId;

    try {
      await env.DB.prepare(
        'INSERT OR IGNORE INTO users (id, created_at_ms, last_seen_at_ms) VALUES (?, ?, ?)'
      ).bind(userId, Date.now(), Date.now()).run();

      await env.DB.prepare('UPDATE users SET last_seen_at_ms=? WHERE id=?')
        .bind(Date.now(), userId)
        .run();
    } catch (_) {}

    const response = await context.next();
    return withCors(response, request, env);
  } catch (error) {
    return json({ error: 'Unauthorized', details: String(error) }, 401, corsHeaders(request, env));
  }
}];

function extractBearerToken(request) {
  const header = request.headers.get('Authorization');
  if (!header) return null;
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || null;
}

function extractSessionCookie(request) {
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(/(?:^|;\s*)__session=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function corsHeaders(request, env) {
  const headers = new Headers();
  const origin = request.headers.get('Origin');
  if (!origin) return headers;

  const allow = env.CORS_ALLOW_ORIGINS
    ? env.CORS_ALLOW_ORIGINS.split(',').map((s) => s.trim())
    : null;

  if (!allow || allow.includes(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Vary', 'Origin');
  }

  headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Authorization,Content-Type');
  headers.set('Access-Control-Max-Age', '86400');
  return headers;
}

function withCors(response, request, env) {
  const out = new Response(response.body, response);
  const headers = corsHeaders(request, env);
  for (const [k, v] of headers.entries()) out.headers.set(k, v);
  return out;
}

function json(obj, status = 200, headers = new Headers()) {
  headers.set('Content-Type', 'application/json');
  return new Response(JSON.stringify(obj), { status, headers });
}
