import express from 'express';
import { query } from '../db.js';
import { append as logAppend } from '../logWriter.js';
import { rateLimit } from '../middleware/rateLimit.js';

export const router = express.Router();

router.post('/event', rateLimit({ windowMs: 60_000, max: 60, key: 'event' }), express.json({ limit: '64kb' }), async (req, res) => {
  try {
    const { visitor_id, type, target_url, page_path, attributes } = req.body || {};
    const vid = visitor_id || req.visitorId;
    if (!vid || !type) return res.sendStatus(400);

    const host = (req.headers.host || '').toString();
    const visitIdRes = await query(
      `select id from visits where visitor_id = $1::uuid and host = $2 order by happened_at desc limit 1`,
      [vid, host]
    );
    const visitId = visitIdRes.rows[0]?.id || null;

    await query(
      `insert into events (visitor_id, visit_id, type, target_url, page_path, attributes)
       values ($1::uuid, $2, $3, $4, $5, $6::jsonb)`,
      [vid, visitId, String(type), target_url || null, page_path || null, attributes ? JSON.stringify(attributes) : null]
    );
    logAppend('events', { type: 'event', happened_at: new Date().toISOString(), visitor_id: vid, visit_id: visitId, event_type: String(type), target_url, page_path, attributes });
    return res.sendStatus(204);
  } catch (err) {
    console.error('[event]', err);
    return res.sendStatus(204);
  }
});

// 1x1 gif pixel fallback: GET /event.gif?type=download&visitor_id=...&target_url=...&page_path=...
router.get('/event.gif', rateLimit({ windowMs: 60_000, max: 120, key: 'eventgif' }), async (req, res) => {
  try {
    const { visitor_id, type = 'custom', target_url, page_path } = req.query || {};
    const vid = visitor_id || req.visitorId;
    if (vid && type) {
      const host = (req.headers.host || '').toString();
      const visitIdRes = await query(
        `select id from visits where visitor_id = $1::uuid and host = $2 order by happened_at desc limit 1`,
        [vid, host]
      );
      const visitId = visitIdRes.rows[0]?.id || null;
      await query(
        `insert into events (visitor_id, visit_id, type, target_url, page_path)
         values ($1::uuid, $2, $3, $4, $5)`,
        [vid, visitId, String(type), target_url || null, page_path || null]
      );
      logAppend('events', { type: 'event', happened_at: new Date().toISOString(), visitor_id: vid, visit_id: visitId, event_type: String(type), target_url, page_path });
    }
  } catch (err) {
    console.error('[event.gif]', err);
  } finally {
    // return a transparent 1x1 gif
    const buf = Buffer.from(
      'R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
      'base64'
    );
    res.set('Content-Type', 'image/gif');
    res.set('Cache-Control', 'no-store');
    res.send(buf);
  }
});
