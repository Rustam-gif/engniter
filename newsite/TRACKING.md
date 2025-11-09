Engniter.com — Minimal Visit + Download Tracking
================================================

This repo now includes a small Express backend that:

- Logs every HTTP request to Postgres (`visits` table)
- Issues a persistent first‑party `vid` cookie (UUID)
- Accepts `/collect-params` POST to attach `fbclid` and `utm_*` to the latest visit
- Accepts `/event` POST (and `/event.gif` pixel fallback) for download clicks (`events` table)
- Serves the static site from the repo root

Local Setup
-----------

1) Start Postgres via Docker

- In `server/`, run: `docker compose up -d`
- Connection: `postgres://app:app@localhost:5432/engniter`

2) Install and migrate

- In `server/`, run: `npm install`
- Apply schema: `npm run migrate`

3) Run the server

- In `server/`, run: `npm run dev`
- Open the site on: `http://localhost:8080`

Environment (optional)
----------------------

You may override defaults via env vars when deploying:

- `PORT=8080`
- `TRUST_PROXY=true`
- `COOKIE_NAME=vid`
- `COOKIE_DOMAIN=.engniter.com` (set in production)
- `COOKIE_TTL_DAYS=365`
- `ANONYMIZE_IP=true`
- `DB_URL=postgres://USER:PASS@HOST:5432/engniter`

How It Works
------------

- `server/src/middleware/visitLogger.js` issues/reads the `vid` cookie and inserts one row per request into `visits`.
- `assets/tracking.js` runs on page load:
  - Parses `fbclid` and UTM params from the URL and POSTs them with `sendBeacon` to `/collect-params`.
  - Hooks all “Download” links and POSTs an `/event` with `{ type: 'download', target_url, page_path }` before navigation.
- Pixel fallback: If POST fails, `/event.gif?...` still creates an `events` row and returns a 1×1 GIF.

Verify End‑to‑End (Local)
-------------------------

1) Direct visit creates a visit row

- Open a private window: `http://localhost:8080/`
- Expect a `Set-Cookie: vid=...; SameSite=Lax;` in the first response.
- Check DB:

```
psql postgres://app:app@localhost:5432/engniter -c "select id, happened_at, visitor_id, host, path from visits order by id desc limit 5;"
```

2) Ad landing params are attached

- Navigate: `http://localhost:8080/?fbclid=FB123&utm_source=facebook&utm_medium=cpc&utm_campaign=launch`
- In DevTools → Network, confirm `collect-params` returns 204.
- Check DB:

```
psql ... -c "select fbclid, utm_source, utm_medium, utm_campaign, params_received_at from visits order by id desc limit 1;"
```

3) Download click emits an event

- Click any App Store button (header ‘Download’, badges, or footer ‘Download’).
- In DevTools → Network, confirm `/event` returns 204 (or `/event.gif`).
- Check DB:

```
psql ... -c "select type, target_url, page_path, visit_id from events order by id desc limit 5;"
```

4) Daily rollups (example queries)

```
psql ... -c "\nSELECT date_trunc('day', happened_at) AS day, COUNT(DISTINCT visitor_id) AS unique_visitors, COUNT(*) AS total_requests\nFROM visits\nWHERE happened_at >= now() - interval '30 days'\nGROUP BY day ORDER BY day;\n"

psql ... -c "\nSELECT date_trunc('day', happened_at) AS day, COUNT(DISTINCT visitor_id) AS unique_ad_visitors, COUNT(*) AS ad_requests\nFROM visits\nWHERE (coalesce(fbclid,'') <> '' OR coalesce(utm_source,'') <> '' OR coalesce(utm_campaign,'') <> '')\nGROUP BY day ORDER BY day;\n"

psql ... -c "\nSELECT date_trunc('day', e.happened_at) AS day, COUNT(*) AS downloads\nFROM events e\nWHERE e.type = 'download'\nGROUP BY day ORDER BY day;\n"
```

Privacy Notes (GDPR)
--------------------

- Cookie banner text example: “We use a first‑party cookie to measure visits and attribute installs. No third‑party trackers. IPs are anonymized by default. Data kept for 90 days.”
- IP handling: Full IP is NOT stored (null), anonymized network stored in `remote_ip_anon` (/24 for IPv4, /64 for IPv6).
- Retention (cron or scheduled job):

```
DELETE FROM events WHERE happened_at < now() - interval '90 days';
DELETE FROM visits WHERE happened_at < now() - interval '90 days';
```

Deployment Checklist
--------------------

- Set `COOKIE_DOMAIN=.engniter.com`, keep `ANONYMIZE_IP=true`.
- Run `npm run migrate` once on the production DB.
- Put the app behind a reverse proxy and set `TRUST_PROXY=true` (to read client IPs).
- Ensure CSP allows `connect-src 'self'` so `/collect-params` and `/event` succeed.
- Backups enabled for Postgres; logs shipped to your sink.

Files of Interest
-----------------

- `server/src/index.js` — Express server
- `server/src/middleware/visitLogger.js` — request logger + cookie
- `server/src/routes/collectParams.js` — attach ad params
- `server/src/routes/event.js` — download events + pixel fallback
- `server/src/sql/schema.sql` — DB schema
- `assets/tracking.js` — client beacon sender

Friendly Files & Exports
------------------------

- JSONL logs on disk (easy to view or import):
  - Visits: `server/logs/visits-YYYY-MM-DD.ndjson`
  - Events: `server/logs/events-YYYY-MM-DD.ndjson`
  - View last lines: `tail -n 50 server/logs/visits-*.ndjson`
- CSV exports (downloadable):
  - Visits: `GET /admin/visits.csv?days=7&limit=10000`
  - Events: `GET /admin/events.csv?days=30&limit=10000`
  - Protect with `X-Admin-Token: <token>` header (set `ADMIN_TOKEN`), otherwise allowed only from localhost.

Admin Dashboard (with Login)
----------------------------

- Login page: `GET /admin/login` (username/password)
  - Defaults: `ADMIN_USER=admin`, `ADMIN_PASS=changeme` (override in env)
- Dashboard: `GET /admin` — shows latest visits and download events; auto-refreshes every 10s
- Logout: `POST /admin/logout`
- JSON for UI:
  - `GET /admin/api/visits?limit=200`
  - `GET /admin/api/events?limit=200`

Auth details
- Cookie-based auth using HMAC-signed token cookie (`admin_auth`, HttpOnly, Secure, SameSite=Lax, 24h).
- Optional header token still supported: set `ADMIN_TOKEN` and send `X-Admin-Token` for scripts/exports.
- DSAR deletion example:

```
-- Delete all data for a visitor_id
DELETE FROM events  WHERE visitor_id = '00000000-0000-0000-0000-000000000000';
DELETE FROM visits  WHERE visitor_id = '00000000-0000-0000-0000-000000000000';
```

Rate Limiting
-------------

- Server enforces per‑IP limits:
  - `/collect-params`: 30 requests per minute
  - `/event`: 60 requests per minute
  - `/event.gif`: 120 requests per minute
  - Returns `429 Too Many Requests` with `Retry-After` header

Conversion Rate Samples
-----------------------

```
-- Daily conversion = downloads / unique ad visitors
WITH ad_visitors AS (
  SELECT date_trunc('day', happened_at) AS day,
         COUNT(DISTINCT visitor_id) AS ad_uniques
  FROM visits
  WHERE (coalesce(fbclid,'') <> '' OR coalesce(utm_source,'') <> '' OR coalesce(utm_campaign,'') <> '')
  GROUP BY 1
),
downloads AS (
  SELECT date_trunc('day', happened_at) AS day,
         COUNT(*) AS downloads
  FROM events
  WHERE type = 'download'
  GROUP BY 1
)
SELECT d.day, d.downloads, coalesce(a.ad_uniques,0) AS ad_uniques,
       CASE WHEN coalesce(a.ad_uniques,0) > 0 THEN round(d.downloads::numeric / a.ad_uniques, 4) ELSE 0 END AS conv_rate
FROM downloads d
LEFT JOIN ad_visitors a USING (day)
ORDER BY d.day;
```

Simple Automation Ideas
-----------------------

- Create a quick flow test using Node (requires server running on :8080):

```
node server/test/flow.test.js
```
