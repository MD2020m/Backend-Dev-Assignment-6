const sqlite3 = require('sqlite3').verbose();

// Connect to database file
db = new sqlite3.Database('./database/university.db');

// Insert sample courses
db.run(`
    INSERT INTO courses (courseCode, title, credits, description, semester)
    VALUES
        ('CS101', 'Intro Programming', 3, 'Learn Python basics', 'Fall 2024'),
        ('BIO120', 'General Biology', 3, 'Introduction to biological principles', 'Fall 2024'),
        ('MATH150', 'Calculus I', 4, 'Basic calculus', 'Fall 2024'),
        ('ENG101', 'Composition I', 3, 'Academic writing and critical thinking', 'Spring 2025'),
        ('ME210', 'Thermodynamics', 3, 'Principles of thermodynaics and heat transfer', 'Spring 2025'),
        ('CS301', 'Database Systems', 3, 'Design and Implementation of database systems', 'Fall 2024'),
        ('PHYS201', 'Pyhsics II', 4, 'Electricity, magnetsim, and modern physics', 'Spring 2025'),
        ('CS201', 'Data Structures', 4, 'Study of fundamental data structures', 'Spring 2025')
`);

console.log('Sample data inserted');

db.all('SELECT * FROM courses', (err, rows) => {
    console.log(rows);
})

db.close();