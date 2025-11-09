export const config = {
  port: parseInt(process.env.PORT || '8080', 10),
  trustProxy: (process.env.TRUST_PROXY || 'true').toLowerCase() === 'true',
  cookieName: process.env.COOKIE_NAME || 'vid',
  cookieDomain: process.env.COOKIE_DOMAIN || undefined, // e.g. .engniter.com in prod
  cookieTtlDays: parseInt(process.env.COOKIE_TTL_DAYS || '365', 10),
  anonymizeIP: (process.env.ANONYMIZE_IP || 'true').toLowerCase() === 'true',
  dbUrl: process.env.DB_URL || 'postgres://app:app@localhost:5432/engniter',
  adminToken: process.env.ADMIN_TOKEN || '',
  adminUser: process.env.ADMIN_USER || 'admin',
  adminPass: process.env.ADMIN_PASS || 'changeme',
  adminSecret: process.env.ADMIN_SECRET || 'dev-admin-secret-change-me',
};
