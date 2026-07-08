const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so our static frontend pages can submit messages to this API
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Initialize PostgreSQL Connection Pool
// The DATABASE_URL connection string can connect to a local PostgreSQL or Cloud databases (Neon, Supabase, etc.)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Add SSL support for production hosting (Render/Railway require SSL)
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test Database Connection
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client from database pool:', err.stack);
    }
    console.log('Successfully connected to the PostgreSQL database.');
    release();
});

// API Root endpoint
app.get('/', (req, res) => {
    res.json({ message: "Portfolio Backend API is running successfully!" });
});

// POST endpoint to handle Contact Form submissions
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Server-side validation
    if (!name || !email || !message) {
        return res.status(400).json({ 
            status: 'error', 
            message: 'All fields (name, email, message) are required.' 
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ 
            status: 'error', 
            message: 'Please provide a valid email address.' 
        });
    }

    try {
        const queryText = 'INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3) RETURNING *';
        const values = [name.trim(), email.trim(), message.trim()];
        
        const result = await pool.query(queryText, values);
        
        console.log(`Successfully stored contact message from: ${email}`);
        
        res.status(201).json({
            status: 'success',
            message: 'Message stored successfully!',
            data: result.rows[0]
        });

    } catch (error) {
        console.error('Error inserting message into database:', error.message);
        res.status(500).json({ 
            status: 'error', 
            message: 'Internal server error while saving message. Please try again later.' 
        });
    }
});

// Start API Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
