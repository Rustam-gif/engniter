import { parse as parseCookie } from 'cookie';
import crypto from 'crypto';
import { config } from '../config.js';
import { query } from '../db.js';
import { append as logAppend } from '../logWriter.js';

function nowUTCISO(){ return new Date().toISOString(); }

function isBot(ua = ''){
  const s = ua.toLowerCase();
  return /(bot|crawl|spider|slurp|curl|wget)/.test(s);
}

function isInApp(ua = ''){
  const s = ua.toLowerCase();
  return /(instagram|fbav|fbios|fban|fbiOS|twitter|line|micromessenger|snapchat|tiktok)/.test(s);
}

function getIP(req){
  // Prefer Cloudflare / standard proxy headers
  const cf = (req.headers['cf-connecting-ip'] || req.headers['true-client-ip'] || '').toString();
  if (cf) return cf;
  const xr = (req.headers['x-real-ip'] || '').toString();
  if (xr) return xr;
  const xf = (req.headers['x-forwarded-for'] || '').toString();
  if (xf) {
    const parts = xf.split(',').map(s => s.trim());
    return parts[0];
  }
  return req.socket?.remoteAddress || '';
}

function anonymizeIP(ip){
  if (!ip) return null;
  if (!config.anonymizeIP) return null; // we store only anon network, full IP stays null
  // IPv4
  if (/^\d+\.\d+\.\d+\.\d+$/.test(ip)) {
    const parts = ip.split('.');
    parts[3] = '0';
    return parts.join('.') + '/24';
  }
  // IPv6
  if (ip.includes(':')) {
    const segs = ip.split(':');
    // zero out last 4 segments roughly
    for (let i = 4; i < segs.length; i++) segs[i] = '0';
    return segs.join(':') + '/64';
  }
  return null;
}

function signCookieAttrs(){
  const days = config.cookieTtlDays;
  const maxAge = days * 24 * 60 * 60; // seconds
  const attrs = [
    `Path=/`,
    `Max-Age=${maxAge}`,
    `SameSite=Lax`,
    `HttpOnly`,
    `Secure`
  ];
  if (config.cookieDomain) attrs.push(`Domain=${config.cookieDomain}`);
  return attrs.join('; ');
}

export async function visitLogger(req, res, next){
  try {
    // issue/read cookie
    const cookies = parseCookie(req.headers.cookie || '');
    let vid = cookies[config.cookieName];
    if (!vid) {
      vid = crypto.randomUUID();
      res.setHeader('Set-Cookie', `${config.cookieName}=${vid}; ${signCookieAttrs()}`);
    }

    // parse request fields
    const host = (req.headers.host || '').toString();
    const path = req.path || req.url || '/';
    const referrer = req.headers.referer || req.headers.referrer || '';
    const queryRaw = req.url.includes('?') ? req.url.split('?')[1].slice(0, 2048) : '';
    const ua = req.headers['user-agent'] || '';
    const ip = getIP(req);
    const ipAnon = anonymizeIP(ip);

    // persist
    // JSON log line
    const logLine = {
      type: 'visit',
      happened_at: nowUTCISO(),
      visitor_id: vid,
      host, path,
      referrer,
      query_raw: queryRaw,
      user_agent: ua,
      remote_ip: config.anonymizeIP ? undefined : ip,
      remote_ip_anon: ipAnon,
      is_in_app_browser: isInApp(ua),
      is_bot: isBot(ua)
    };
    console.log(JSON.stringify(logLine));
    logAppend('visits', logLine);

    // Insert without blocking request flow
    Promise.resolve().then(() => query(
      `insert into visits (happened_at, visitor_id, host, path, referrer, query_raw, user_agent, remote_ip, remote_ip_anon, is_in_app_browser, is_bot)
       values (now(), $1::uuid, $2, $3, $4, $5, $6, $7::inet, $8::inet, $9, $10)`,
      [vid, host, path, referrer, queryRaw, ua, config.anonymizeIP ? null : ip, ipAnon, isInApp(ua), isBot(ua)]
    )).catch(err => console.error(`[visitLogger][db] ${nowUTCISO()} ${err.message}`));

    // make available downstream
    req.visitorId = vid;
  } catch (err) {
    // Don’t block the request if DB fails
    console.error(`[visitLogger] ${nowUTCISO()} error:`, err.message);
  } finally {
    next();
  }
}
