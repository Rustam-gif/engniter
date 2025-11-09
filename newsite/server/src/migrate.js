import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main(){
  const sqlPath = path.join(__dirname, 'sql', 'schema.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');
  await query(sql);
  console.log('Migrations applied.');
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });

