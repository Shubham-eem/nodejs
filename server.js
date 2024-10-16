const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Booking endpoint
app.post('/api/book', (req, res) => {
    const { name, email, service, date } = req.body;
    const query = 'INSERT INTO bookings (name, email, service, date) VALUES (?, ?, ?, ?)';

    db.query(query, [name, email, service, date], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database insertion failed.' });
        }
        res.status(201).json({ message: 'Booking successful!', id: results.insertId });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
