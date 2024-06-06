import { query } from './db';

export async function isAdminUserExists() {
  const users = await query('SELECT * FROM users WHERE role = ?', ['admin']);
  return users.length > 0;
}