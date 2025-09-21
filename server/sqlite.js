import Database from 'better-sqlite3';
if (!process.env.DB_FILE) {
    throw new Error('DB_FILE is not set');
}
const dbPath = process.env.DB_FILE
const db = new Database(dbPath);
export default db;
