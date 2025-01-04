var mysql = require('mysql');

// Create connection
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'AllClubs'
});

//Connect to the database
con.connect(function (err) {
    if (err) throw err;
    console.log('Connected to the database!');

    // Create 'Aerokle_tb' table
    var createRegisterTable =  `
    CREATE TABLE IF NOT EXISTS registrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) NOT NULL,
        usn VARCHAR(20) NOT NULL,
        semester INT NOT NULL,
        year INT NOT NULL,
        goals TEXT NOT NULL,
        reasons TEXT NOT NULL,
        contact VARCHAR(10) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    
    con.query(createRegisterTable, function (err, result) {
        if (err) throw err;
        console.log('Register_tb table created!');
    });

    // Close the connection after table creation
    // con.end(function (err) {
    //     if (err) throw err;
    //     console.log('Connection closed.');
    // });
});