const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Use an absolute path for better reliability (especially in Docker)
const dbPath = path.resolve(__dirname, "results.db");

// Open SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Create table if it does not exist
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      roll INTEGER UNIQUE NOT NULL,
      percentage REAL NOT NULL
    )`,
    (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        console.log("Table 'students' is ready.");
      }
    }
  );
});

// Export the database connection
module.exports = db;
