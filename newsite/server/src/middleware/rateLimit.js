// Simple in-memory fixed-window rate limiter per IP + route key
// Not suitable for multi-instance without shared store, but fine for minimal deployment.

const buckets = new Map(); // key -> { count, resetAt }

export function rateLimit({ windowMs, max, key = '' }){
  return (req, res, next) => {
    const ip = (req.headers['cf-connecting-ip'] || req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.ip || 'unknown').toString();
    const k = `${key}:${ip}`;
    const now = Date.now();
    let b = buckets.get(k);
    if (!b || b.resetAt <= now) {
      b = { count: 0, resetAt: now + windowMs };
      buckets.set(k, b);
    }
    b.count += 1;
    if (b.count > max) {
      res.setHeader('Retry-After', Math.ceil((b.resetAt - now) / 1000));
      return res.status(429).send('Too Many Requests');
    }
    next();
  };
}

