import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { config } from './config.js';
import { getPool } from './db.js';
import { visitLogger } from './middleware/visitLogger.js';
import { router as collectParams } from './routes/collectParams.js';
import { router as eventRouter } from './routes/event.js';
import { router as adminRouter } from './routes/admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');

async function main(){
  // Warm up DB connection (non-blocking)
  try { await getPool().query('select 1'); }
  catch (e) { console.warn('[db] not ready yet, continuing without it:', e.message); }

  const app = express();
  if (config.trustProxy) app.set('trust proxy', true);

  // Request logging and cookie issuance for ALL requests
  app.use(visitLogger);

  // Tracking endpoints
  app.use(collectParams);
  app.use(eventRouter);
  app.use(adminRouter);

  // Serve static site from project root
  app.use(express.static(projectRoot));

  app.listen(config.port, () => {
    console.log(`Tracking server listening on http://localhost:${config.port}`);
  });
}

main().catch(err => { console.error(err); process.exit(1); });
