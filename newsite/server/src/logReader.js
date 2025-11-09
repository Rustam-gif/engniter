import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logsDir = path.resolve(__dirname, '../logs');

function fileFor(prefix, date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return path.join(logsDir, `${prefix}-${y}-${m}-${d}.ndjson`);
}

function readLines(file) {
  try {
    if (!fs.existsSync(file)) return [];
    const txt = fs.readFileSync(file, 'utf8');
    return txt.split('\n').filter(Boolean);
  } catch { return []; }
}

export function readRecent(prefix, limit = 100) {
  const today = new Date();
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const lines = [...readLines(fileFor(prefix, today)), ...readLines(fileFor(prefix, yesterday))];
  const parsed = [];
  for (let i = lines.length - 1; i >= 0 && parsed.length < limit; i--) {
    try { parsed.push(JSON.parse(lines[i])); } catch { /* ignore */ }
  }
  return parsed;
}

