import { Pool } from 'pg';
import { config } from './config.js';

let pool;
export function getPool() {
  if (!pool) {
    pool = new Pool({ connectionString: config.dbUrl, application_name: 'engniter-tracker' });
  }
  return pool;
}

export async function query(text, params) {
  const p = getPool();
  return p.query(text, params);
}

