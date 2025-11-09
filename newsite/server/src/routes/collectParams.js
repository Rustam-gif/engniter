import express from 'express';
import { query } from '../db.js';
import { rateLimit } from '../middleware/rateLimit.js';

export const router = express.Router();

router.post('/collect-params', rateLimit({ windowMs: 60_000, max: 30, key: 'collect' }), express.json({ limit: '32kb' }), async (req, res) => {
  try {
    const { visitor_id, fbclid, utm_source, utm_medium, utm_campaign } = req.body || {};
    const vid = visitor_id || req.visitorId;
    if (!vid) return res.sendStatus(400);

    await query(
      `update visits v set
          fbclid = coalesce($2, v.fbclid),
          utm_source = coalesce($3, v.utm_source),
          utm_medium = coalesce($4, v.utm_medium),
          utm_campaign = coalesce($5, v.utm_campaign),
          params_received_at = now()
       where v.id = (
         select id from visits where visitor_id = $1::uuid and host = $6
           and happened_at >= now() - interval '30 minutes'
         order by happened_at desc limit 1
       )`,
      [vid, fbclid || null, utm_source || null, utm_medium || null, utm_campaign || null, (req.headers.host || '').toString()]
    );
    return res.sendStatus(204);
  } catch (err) {
    console.error('[collect-params]', err);
    return res.sendStatus(204); // be silent to clients even on failure
  }
});
