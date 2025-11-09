import express from 'express';
import { query } from '../db.js';
import { config } from '../config.js';
import { adminAuthMiddleware, issueAdminCookie, clearAdminCookie } from '../admin/auth.js';
import { rateLimit } from '../middleware/rateLimit.js';
import { readRecent } from '../logReader.js';

export const router = express.Router();

function gate(){
  return config.adminPublic ? (req,res,next)=>next() : adminAuthMiddleware;
}

// Login page (GET)
router.get('/admin/login', (req, res) => {
  res.set('Content-Type', 'text/html; charset=utf-8');
  res.end(`<!doctype html>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Admin Login</title>
  <style>
    body{font:16px/1.4 system-ui,-apple-system,Segoe UI,Roboto,Arial;display:grid;place-items:center;height:100vh;margin:0;background:#f7fafc;color:#111}
    .card{width:min(360px,92%);background:#fff;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.08);padding:20px;border:1px solid rgba(0,0,0,.06)}
    h1{font-size:20px;margin:0 0 12px}
    label{display:block;font-weight:600;margin:10px 0 6px}
    input{width:100%;padding:10px 12px;border:1px solid #d1d5db;border-radius:10px}
    button{margin-top:14px;width:100%;padding:10px 12px;border-radius:10px;border:0;background:#111827;color:#fff;font-weight:700}
    .muted{color:#6b7280;font-size:13px;margin-top:8px}
  </style>
  <div class="card">
    <h1>Admin Login</h1>
    <form method="POST" action="/admin/login">
      <label>Username</label>
      <input name="username" autocomplete="username" required />
      <label>Password</label>
      <input name="password" type="password" autocomplete="current-password" required />
      <button type="submit">Sign in</button>
      <div class="muted">Default: admin / changeme (set ADMIN_USER / ADMIN_PASS)</div>
    </form>
  </div>`);
});

// Login (POST)
router.post('/admin/login', rateLimit({ windowMs: 60_000, max: 20, key: 'admin-login' }), express.urlencoded({ extended: false }), (req, res) => {
  const { username = '', password = '' } = req.body || {};
  const ok = username === config.adminUser && password === config.adminPass;
  if (!ok) return res.status(401).send('Invalid credentials');
  issueAdminCookie(res, username);
  res.redirect('/admin');
});

router.post('/admin/logout', gate(), (req, res) => {
  clearAdminCookie(res);
  res.redirect('/admin/login');
});

router.get('/admin/visits.csv', gate(), async (req, res) => {
  const days = Math.min(parseInt(req.query.days || '7', 10), 90);
  const limit = Math.min(parseInt(req.query.limit || '10000', 10), 200000);
  const sql = `
    select to_char(happened_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as happened_at,
           visitor_id, host, path, coalesce(referrer,'') as referrer,
           coalesce(query_raw,'') as query_raw,
           coalesce(user_agent,'') as user_agent,
           coalesce(remote_ip_anon::text,'') as remote_ip_anon,
           coalesce(fbclid,'') as fbclid,
           coalesce(utm_source,'') as utm_source,
           coalesce(utm_medium,'') as utm_medium,
           coalesce(utm_campaign,'') as utm_campaign
    from visits
    where happened_at >= now() - interval '${days} days'
    order by happened_at desc
    limit ${limit}
  `;
  const { rows } = await query(sql);
  res.set('Content-Type', 'text/csv; charset=utf-8');
  res.set('Content-Disposition', 'attachment; filename="visits.csv"');
  const header = 'happened_at,visitor_id,host,path,referrer,query_raw,user_agent,remote_ip_anon,fbclid,utm_source,utm_medium,utm_campaign\n';
  res.write(header);
  for (const r of rows) {
    const cols = [r.happened_at, r.visitor_id, r.host, r.path, r.referrer, r.query_raw, r.user_agent, r.remote_ip_anon, r.fbclid, r.utm_source, r.utm_medium, r.utm_campaign]
      .map(v => String(v||'').replaceAll('"','""'))
      .map(v => /[,\n"]/.test(v) ? `"${v}"` : v);
    res.write(cols.join(',') + '\n');
  }
  res.end();
});

router.get('/admin/events.csv', gate(), async (req, res) => {
  const days = Math.min(parseInt(req.query.days || '30', 10), 365);
  const limit = Math.min(parseInt(req.query.limit || '10000', 10), 200000);
  const sql = `
    select to_char(happened_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as happened_at,
           visitor_id, visit_id, type, coalesce(target_url,'') as target_url, coalesce(page_path,'') as page_path,
           coalesce(attributes::text,'') as attributes
    from events
    where happened_at >= now() - interval '${days} days'
    order by happened_at desc
    limit ${limit}
  `;
  const { rows } = await query(sql);
  res.set('Content-Type', 'text/csv; charset=utf-8');
  res.set('Content-Disposition', 'attachment; filename="events.csv"');
  const header = 'happened_at,visitor_id,visit_id,type,target_url,page_path,attributes\n';
  res.write(header);
  for (const r of rows) {
    const cols = [r.happened_at, r.visitor_id, r.visit_id, r.type, r.target_url, r.page_path, r.attributes]
      .map(v => String(v||'').replaceAll('"','""'))
      .map(v => /[,\n"]/.test(v) ? `"${v}"` : v);
    res.write(cols.join(',') + '\n');
  }
  res.end();
});

// JSON APIs for UI
router.get('/admin/api/visits', gate(), async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit || '100', 10), 2000);
  try {
    const rows = (await query(
      `select id, happened_at, visitor_id, host, path, coalesce(referrer,'') as referrer,
              coalesce(user_agent,'') as user_agent,
              coalesce(remote_ip_anon::text,'') as remote_ip_anon,
              coalesce(fbclid,'') as fbclid, coalesce(utm_source,'') as utm_source,
              coalesce(utm_medium,'') as utm_medium, coalesce(utm_campaign,'') as utm_campaign,
              is_in_app_browser, is_bot
       from visits order by id desc limit $1`, [limit]
    )).rows;
    return res.json({ rows, source: 'db' });
  } catch (e) {
    // Fallback to NDJSON logs
    const recent = readRecent('visits', limit).map((v, idx) => ({
      id: -idx,
      happened_at: v.happened_at || v.timestamp || new Date().toISOString(),
      visitor_id: v.visitor_id || '',
      host: v.host || '',
      path: v.path || '',
      referrer: v.referrer || '',
      user_agent: v.user_agent || '',
      remote_ip_anon: v.remote_ip_anon || '',
      fbclid: v.fbclid || '',
      utm_source: v.utm_source || '',
      utm_medium: v.utm_medium || '',
      utm_campaign: v.utm_campaign || '',
      is_in_app_browser: !!v.is_in_app_browser,
      is_bot: !!v.is_bot,
    }));
    return res.json({ rows: recent, source: 'logs' });
  }
});

router.get('/admin/api/events', gate(), async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit || '100', 10), 2000);
  try {
    const rows = (await query(
      `select id, happened_at, visitor_id, visit_id, type, coalesce(target_url,'') as target_url, coalesce(page_path,'') as page_path
       from events order by id desc limit $1`, [limit]
    )).rows;
    return res.json({ rows, source: 'db' });
  } catch (e) {
    const recent = readRecent('events', limit).map((ev, idx) => ({
      id: -idx,
      happened_at: ev.happened_at || new Date().toISOString(),
      visitor_id: ev.visitor_id || '',
      visit_id: ev.visit_id || null,
      type: ev.event_type || ev.type || 'custom',
      target_url: ev.target_url || '',
      page_path: ev.page_path || '',
    }));
    return res.json({ rows: recent, source: 'logs' });
  }
});

// Admin dashboard page
router.get('/admin', gate(), (req, res) => {
  res.set('Content-Type', 'text/html; charset=utf-8');
  res.end(`<!doctype html>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Engniter Admin</title>
  <style>
    :root{--bg:#0b1320;--text:#0f172a}
    body{font:15px/1.45 system-ui,-apple-system,Segoe UI,Roboto,Arial;margin:0;background:#f7f9fc;color:#0f172a}
    header{position:sticky;top:0;background:#fff;border-bottom:1px solid #e5e7eb;padding:10px 14px;display:flex;justify-content:space-between;align-items:center}
    header h1{margin:0;font-size:18px}
    header form{margin:0}
    header button{background:#111827;color:#fff;border:0;border-radius:8px;padding:8px 10px}
    .wrap{width:min(1100px,92%);margin:16px auto}
    .cards{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    .card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;box-shadow:0 6px 20px rgba(0,0,0,.04)}
    .card h2{margin:0;padding:12px 12px;border-bottom:1px solid #e5e7eb;font-size:16px}
    table{width:100%;border-collapse:collapse}
    th,td{text-align:left;padding:8px 12px;border-bottom:1px solid #f0f2f5;vertical-align:top}
    th{font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.05em}
    tr:hover td{background:#fafafa}
    .muted{color:#6b7280}
    .pill{font-size:12px;border:1px solid #e5e7eb;border-radius:999px;padding:2px 8px;background:#f9fafb}
    .meta{display:flex;gap:8px;flex-wrap:wrap}
  </style>
  <header>
    <h1>Engniter Admin</h1>
    <form method="POST" action="/admin/logout"><button type="submit">Logout</button></form>
  </header>
  <div class="wrap">
    <div class="cards">
      <div class="card">
        <h2>Recent Visits</h2>
        <div class="table-wrap">
          <table id="visits"><thead><tr>
            <th>Time (UTC)</th><th>Visitor</th><th>Host/Path</th><th>Referrer</th><th>UA</th><th>IP</th><th>Tags</th>
          </tr></thead><tbody></tbody></table>
        </div>
      </div>
      <div class="card">
        <h2>Download Events</h2>
        <div class="table-wrap">
          <table id="events"><thead><tr>
            <th>Time (UTC)</th><th>Visitor</th><th>Visit</th><th>Type</th><th>Target</th><th>Page</th>
          </tr></thead><tbody></tbody></table>
        </div>
      </div>
    </div>
  </div>
  <script>
    async function loadVisits(){
      const res = await fetch('/admin/api/visits?limit=200',{credentials:'include'}); const j = await res.json();
      const tb = document.querySelector('#visits tbody'); tb.innerHTML='';
      j.rows.forEach(r=>{
        const tr = document.createElement('tr');
        const tags = [];
        if(r.fbclid) tags.push('fbclid');
        if(r.utm_source) tags.push('utm');
        if(r.is_in_app_browser) tags.push('in-app');
        if(r.is_bot) tags.push('bot');
        tr.innerHTML = '
          <td><span class="muted">' + r.happened_at.replace('T',' ').replace('Z','') + '</span></td>'+
          '<td class="muted">' + r.visitor_id + '</td>'+
          '<td>' + r.host + '<div class="muted">' + r.path + '</div></td>'+
          '<td class="muted">' + (r.referrer || '') + '</td>'+
          '<td class="muted">' + ((r.user_agent||'').slice(0,80)) + '</td>'+
          '<td class="muted">' + (r.remote_ip_anon || '') + '</td>'+
          '<td class="meta">' + tags.map(function(t){return '<span class="pill">' + t + '</span>';}).join('') + '</td>';
        tb.appendChild(tr);
      });
    }
    async function loadEvents(){
      const res = await fetch('/admin/api/events?limit=200',{credentials:'include'}); const j = await res.json();
      const tb = document.querySelector('#events tbody'); tb.innerHTML='';
      j.rows.forEach(r=>{
        const tr = document.createElement('tr');
        tr.innerHTML = '
          <td><span class="muted">' + r.happened_at.replace('T',' ').replace('Z','') + '</span></td>'+
          '<td class="muted">' + r.visitor_id + '</td>'+
          '<td class="muted">' + (r.visit_id || '') + '</td>'+
          '<td>' + r.type + '</td>'+
          '<td class="muted">' + ((r.target_url||'').slice(0,64)) + '</td>'+
          '<td class="muted">' + (r.page_path || '') + '</td>';
        tb.appendChild(tr);
      });
    }
    function refresh(){ loadVisits(); loadEvents(); }
    refresh(); setInterval(refresh, 10000);
  </script>`);
});
