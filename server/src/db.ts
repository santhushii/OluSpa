import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const DB_DIRECTORY = path.join(__dirname, "../data");
const DB_PATH = path.join(DB_DIRECTORY, "bookings.db");

fs.mkdirSync(DB_DIRECTORY, { recursive: true });

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");

db.prepare(
  `CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    treatment TEXT NOT NULL,
    preferredDate TEXT NOT NULL,
    preferredTime TEXT NOT NULL,
    notes TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`
).run();

export default db;

