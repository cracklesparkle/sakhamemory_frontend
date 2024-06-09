import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export async function query(sql, values) {
  const [results] = await connection.execute(sql, values);
  return results;
}

export async function closeConnection() {
  await connection.end();
}