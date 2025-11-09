import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logsDir = path.resolve(__dirname, '../logs');

function ensureDir(){
  try { fs.mkdirSync(logsDir, { recursive: true }); } catch(_){}
}

function fileFor(prefix, date = new Date()){
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth()+1).padStart(2,'0');
  const d = String(date.getUTCDate()).padStart(2,'0');
  return path.join(logsDir, `${prefix}-${y}-${m}-${d}.ndjson`);
}

export function append(prefix, obj){
  try {
    ensureDir();
    const line = JSON.stringify(obj) + '\n';
    fs.appendFile(fileFor(prefix), line, { encoding: 'utf8' }, ()=>{});
  } catch(e){ /* best-effort */ }
}

