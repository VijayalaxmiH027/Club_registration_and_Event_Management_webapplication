const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'AllClubs', // Replace with your actual database name
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database.');
});

// Set up multer storage to store the image in the uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'Dbs', 'uploads'); // Ensure the correct path to the uploads folder
    cb(null, uploadDir); // Set your upload directory path
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep the original file name
  },
});

// Initialize multer upload
const upload = multer({ storage: storage });

// Upload Image Endpoint (now handling only file upload)
app.post('/upload-image', upload.single('file'), (req, res) => {
  const { name } = req.body; // Accept the image name from the request body
  const file = req.file;

  if (!name || !file) {
    return res.status(400).json({ message: 'Invalid request data. Name and file are required.' });
  }

  // Save the image name and file path (only the file name) to the database
  const imageUrl = `/uploads/${file.filename}`; // Store only the image name
  const sql = 'INSERT INTO gallery (name, image_path) VALUES (?, ?)';
  db.query(sql, [name, imageUrl], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error.', error: err.message });
    res.status(200).json({ id: result.insertId, message: 'Image uploaded and saved to database!' });
  });
});

// Fetch All Image URLs Endpoint
app.get('/get-images', (req, res) => {
  const sql = 'SELECT * FROM gallery ORDER BY uploaded_at DESC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error.' });
    res.status(200).json(results);
  });
});

// Start Server
app.listen(3001, () => { 
  console.log('Server started on http://localhost:3001'); 
});
