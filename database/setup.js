const sqlite3 = require('sqlite3').verbose();

// Create/connect to database file
const db = new sqlite3.Database('./database/university.db');
console.log('Connected to SQLite database');

// Create courses table
// id (int), courseCode (text), title(text), credits (int), description (text), semester (text)
db.run(`
    CREATE TABLE courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        courseCode TEXT,
        title TEXT,
        credits INTEGER,
        description TEXT,
        semester TEXT
    )
`);

console.log('Courses table created');
db.close();