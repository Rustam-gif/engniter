import crypto from 'crypto';
import { config } from '../config.js';

const COOKIE = 'admin_auth';

function hmac(data){
  return crypto.createHmac('sha256', config.adminSecret).update(data).digest('base64url');
}

export function issueAdminCookie(res, username, ttlMinutes = 60 * 24) { // default 24h
  const exp = Date.now() + ttlMinutes * 60 * 1000;
  const payload = JSON.stringify({ u: username, exp });
  const sig = hmac(payload);
  const token = Buffer.from(payload).toString('base64url') + '.' + sig;
  const attrs = [
    'HttpOnly', 'SameSite=Lax', 'Secure', 'Path=/'
  ];
  const maxAge = Math.floor(ttlMinutes * 60);
  attrs.push(`Max-Age=${maxAge}`);
  if (config.cookieDomain) attrs.push(`Domain=${config.cookieDomain}`);
  res.setHeader('Set-Cookie', `${COOKIE}=${token}; ${attrs.join('; ')}`);
}

export function clearAdminCookie(res){
  const attrs = ['HttpOnly', 'SameSite=Lax', 'Secure', 'Path=/', 'Max-Age=0'];
  if (config.cookieDomain) attrs.push(`Domain=${config.cookieDomain}`);
  res.setHeader('Set-Cookie', `${COOKIE}=deleted; ${attrs.join('; ')}`);
}

export function readAdminToken(req){
  const raw = (req.headers.cookie || '').split(/;\s*/).find(c => c.startsWith(COOKIE + '='));
  if (!raw) return null;
  const token = raw.split('=')[1];
  if (!token || !token.includes('.')) return null;
  const [payloadB64, sig] = token.split('.');
  try {
    const payloadJson = Buffer.from(payloadB64, 'base64url').toString('utf8');
    const expected = hmac(payloadJson);
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
    const payload = JSON.parse(payloadJson);
    if (!payload || typeof payload.exp !== 'number') return null;
    if (Date.now() > payload.exp) return null;
    return payload.u || null;
  } catch { return null; }
}

export function adminAuthMiddleware(req, res, next){
  // Header token still supported
  if (config.adminToken && req.headers['x-admin-token'] === config.adminToken) return next();
  const u = readAdminToken(req);
  if (u) return next();
  // If not authenticated, redirect to login page (GET) or 401 for API/POST
  if (req.method === 'GET' && req.path.startsWith('/admin')) {
    return res.redirect('/admin/login');
  }
  return res.status(401).send('Unauthorized');
}

