var mysql = require('mysql');

// Create connection
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'AllClubs'
});

// Connect to the database
con.connect(function (err) {
    if (err) throw err;
    console.log('Connected to the database!');

    // Create 'login' table
    var createLoginTable = `
    CREATE TABLE IF NOT EXITS login (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;
    
    con.query(createLoginTable, function (err, result) {
        if (err) throw err;
        console.log('login table created!');
    });

    // Create 'feedback' table
    var createFeedbackTable = `
    CREATE TABLE IT NOT EXITS feedback (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      club VARCHAR(255),
      comments TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;
    
    con.query(createFeedbackTable, function (err, result) {
        if (err) throw err;
        console.log('feedback table created!');
    });

    // Close the connection after creating the tables
    // Uncomment the below lines if you want to close the connection
    // con.end(function (err) {
    //     if (err) throw err;
    //     console.log('Connection closed.');
    // });
});
