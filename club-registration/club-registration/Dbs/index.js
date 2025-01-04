const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const feedbackRoutes = require('./routes/feedbackRoutes'); // Import feedback routes

// Initialize express app
const app = express();
const port = 3001;

// Enable CORS for the frontend to access the backend
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE'],
}));

// Middleware to parse form data (to access caption in req.body)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '', // Add your MySQL password here
  database: 'AllClubs' // Replace with your actual DB name
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

// SIGNUP Endpoint
app.post("/signup", (req, res) => {
  const {
    first_name,
    last_name,
    username,
    birth_date,
    phone_number,
    semester,
    usn,
    password,
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !username ||
    !birth_date ||
    !phone_number ||
    !semester ||
    !usn ||
    !password
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

    // Check if user exists
    const checkQuery = "SELECT * FROM signup WHERE username = ? OR usn = ?";
    db.query(checkQuery, [username, usn], (err, results) => {
      if (err) {
        console.error("Error checking existing user:", err.message);
        return res.status(500).json({ message: "Error checking existing user" });
      }
  
      if (results.length > 0) {
        return res
          .status(400)
          .json({ message: "A user with this username or USN already exists" });
      }
  
      // Insert new user
      const insertQuery = `
        INSERT INTO signup (first_name, last_name, username, birth_date, phone_number, semester, usn, password)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      db.query(
        insertQuery,
        [
          first_name,
          last_name,
          username,
          birth_date,
          phone_number,
          semester,
          usn,
          password,
        ],
        (err) => {
          if (err) {
            console.error("Error inserting user:", err.message);
            return res.status(500).json({ message: "Error inserting data" });
          }
          res.status(201).json({ message: "User registered successfully" });
        }
      );
    });
  });




// LOGIN Endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const query = "SELECT * FROM signup WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0 || results[0].password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = results[0];
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.username,
        phone_number: user.phone_number,
        semester: user.semester,
        usn: user.usn,
      },
    });
  });
});


// API Endpoint to Handle Registration
app.post("/register", (req, res) => {
  const { email, usn, semester, year, goals, reasons, contact } = req.body;

  // Insert data into the database
  const query = `
      INSERT INTO registrations (email, usn, semester, year, goals, reasons, contact)
      VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
      query,
      [email, usn, semester, year, goals, reasons, contact],
      (err, result) => {
          if (err) {
              console.error("Error inserting data:", err);
              res.status(500).json({ message: "Database error" });
          } else {
              res.status(200).json({ message: "Registration successful" });
          }
      }
  );
});



// Feedback endpoint
app.post('/feedback', (req, res) => {
  const { name, email, club, comments } = req.body;
  const sql = "INSERT INTO feedback (name, email, club, comments) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, club, comments], (err, result) => {
      if (err) {
          console.error("Error saving feedback:", err);
          res.status(500).send("Error saving feedback");
      } else {
          res.status(201).send("Feedback saved successfully");
      }
  });
});




// Set up multer for file uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Store files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with a unique name
  },
});

const upload = multer({ storage: storage });

// API to handle file upload
app.post('/upload-aerokle', upload.single('file'), (req, res) => {
  const file = req.file;
  const caption = req.body.file_caption;  // Access the caption from the request body

  if (!file) return res.status(400).json({ error: 'No file uploaded.' });

  if (!caption) return res.status(400).json({ error: 'Caption is required.' });

  const fileName = file.filename;
  const filePath = path.join('uploads', fileName);

  // Store file information along with caption in the 'Aerokle_tb' table
  const query = 'INSERT INTO Aerokle_tb (file_name, file_path, file_caption) VALUES (?, ?, ?)';
  db.query(query, [fileName, filePath, caption], (err) => {
    if (err) {
      console.error('Error saving file to database:', err);
      return res.status(500).json({ error: 'Failed to store file information in database.' });
    }
    res.status(200).json({
      message: 'File uploaded successfully.',
      file: { file_name: fileName, file_path: filePath, caption: caption }
    });
  });
});

// API to fetch all uploaded files (for viewing purposes)
app.get('/files-aerokle', (req, res) => {
  db.query('SELECT * FROM Aerokle_tb', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ files: results });
  });
});

// API to delete a file by ID
app.delete('/delete-file-aerokle/:id', (req, res) => {
  const fileId = req.params.id;

  // Query to get file details based on ID
  const selectQuery = 'SELECT file_path FROM Aerokle_tb WHERE id = ?';
  db.query(selectQuery, [fileId], (err, results) => {
    if (err) {
      console.error('Error fetching file details:', err);
      return res.status(500).json({ error: 'Error fetching file details.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'File not found.' });
    }

    const filePath = results[0].file_path;

    // Delete the file from the filesystem
    fs.unlink(filePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error('Error deleting file from filesystem:', unlinkErr);
        return res.status(500).json({ error: 'Failed to delete file from server.' });
      }

      // Delete the file record from the database
      const deleteQuery = 'DELETE FROM Aerokle_tb WHERE id = ?';
      db.query(deleteQuery, [fileId], (deleteErr) => {
        if (deleteErr) {
          console.error('Error deleting file from database:', deleteErr);
          return res.status(500).json({ error: 'Failed to delete file from database.' });
        }

        res.status(200).json({ message: 'File deleted successfully!' });
      });
    });
  });
});


//UPSC club
// API to handle file upload
app.post('/upload-upsc', upload.single('file'), (req, res) => {
  const file = req.file;
  const caption = req.body.file_caption;  // Access the caption from the request body

  if (!file) return res.status(400).json({ error: 'No file uploaded.' });

  if (!caption) return res.status(400).json({ error: 'Caption is required.' });

  const fileName = file.filename;
  const filePath = path.join('uploads', fileName);

  // Store file information along with caption in the 'Aerokle_tb' table
  const query = 'INSERT INTO upsc_files (file_name, file_path, file_caption) VALUES (?, ?, ?)';
  db.query(query, [fileName, filePath, caption], (err) => {
    if (err) {
      console.error('Error saving file to database:', err);
      return res.status(500).json({ error: 'Failed to store file information in database.' });
    }
    res.status(200).json({
      message: 'File uploaded successfully.',
      file: { file_name: fileName, file_path: filePath, caption: caption }
    });
  });
});

// API to fetch all uploaded files (for viewing purposes)
app.get('/files-upsc', (req, res) => {
  db.query('SELECT * FROM upsc_files', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ files: results });
  });
});

// API to delete a file by ID
app.delete('/delete-file-upsc/:id', (req, res) => {
  const fileId = req.params.id;

  // Query to get file details based on ID
  const selectQuery = 'SELECT file_path FROM upsc_files WHERE id = ?';
  db.query(selectQuery, [fileId], (err, results) => {
    if (err) {
      console.error('Error fetching file details:', err);
      return res.status(500).json({ error: 'Error fetching file details.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'File not found.' });
    }

    const filePath = results[0].file_path;

    // Delete the file from the filesystem
    fs.unlink(filePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error('Error deleting file from filesystem:', unlinkErr);
        return res.status(500).json({ error: 'Failed to delete file from server.' });
      }

      // Delete the file record from the database
      const deleteQuery = 'DELETE FROM upsc_files WHERE id = ?';
      db.query(deleteQuery, [fileId], (deleteErr) => {
        if (deleteErr) {
          console.error('Error deleting file from database:', deleteErr);
          return res.status(500).json({ error: 'Failed to delete file from database.' });
        }

        res.status(200).json({ message: 'File deleted successfully!' });
      });
    });
  });
});


// POST /api/register endpoint
app.post('/api/register', (req, res) => {
  const { event, formData } = req.body;

  if (!event || !formData) {
    return res.status(400).send({ message: 'Missing event or form data' });
  }

  const tableName = getEventTableName(event.name);

  if (!tableName) {
    return res.status(400).send({ message: 'Invalid event name' });
  }

  const query = `
    INSERT INTO ${tableName} (name, age, phone, usn, email, year, branch)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    formData.name,
    formData.age,
    formData.phone,
    formData.usn,
    formData.email,
    formData.year,
    formData.branch,
  ];

  db.query(query, values, (err) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send({ message: 'Error inserting data into the database' });
    }
    console.log(`Registration successful for event: ${event.name}`);
    res.status(200).send({ message: 'Registration successful!' });
  });
});

// Function to get table name based on event name
function getEventTableName(eventName) {
  switch (eventName) {
    case 'Annual Dance Showcase': return 'annual_dance_showcase';
    case 'Code & Hackathon': return 'code_hackathon';
    case  'Music Night': return 'music_night';
    case 'UPSC Seminar': return 'upsc_seminar';
    case 'Military Career Guidance': return 'military_career_guidance';
    case 'Photography Workshop': return 'photography_workshop';
    case 'Literary Fest': return 'literary_fest';
    default: return null;
  }
}



app.set('db', db);
app.use('/feedback', feedbackRoutes);
// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
