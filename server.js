const express = require("express");
const sqlite3 = require("sqlite3");
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Connect to database
const db = new sqlite3.Database('./database/university.db');

// GET all courses
app.get('/api/courses', (req, res) => {
    db.all('SELECT * FROM courses', (err, rows) => {
        res.json(rows);
    });
});

// GET a single course based on ID
app.get('/api/courses/:id', (req, res) => {
    const id = req.params.id;
    db.all('SELECT * FROM courses WHERE id = ?', [id], (err, row) => {
        res.json(row);
    });
});

// POST using INSERT statement
app.post('/api/courses', (req, res) => {
    const { courseCode, title, credits, description, semester } = req.body;
    db.run(`
        INSERT INTO courses (courseCode, title, credits, description, semester)
        VALUES (?, ?, ?, ?, ?)
        `, [courseCode, title, credits, description, semester],
    function(err) {
        res.json({ id: this.lastID });
    });
});

//PUT using UPDATE statement
app.put('/api/courses/:id', (req, res) => {
    const id = req.params.id;
    const { courseCode, title, credits, description, semester } = req.body;
    db.run(`UPDATE courses SET courseCode = ?, title = ?, credits = ?, description = ?, semester = ? WHERE id = ?
        `, [courseCode, title, credits, description, semester, id],
    function(err) {
        res.json({ message: 'Course updated' });
    });
});

// DELETE
app.delete('/api/courses/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM courses WHERE id = ?', [id],
        function(err) {
            res.json({ message: 'Course deleted' });
        }
    );
});

app.listen(port, () => {
    console.log(`API  running at https://localhost:${port}`)
})