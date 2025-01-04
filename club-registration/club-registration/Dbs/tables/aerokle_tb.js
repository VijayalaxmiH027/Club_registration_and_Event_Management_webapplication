var mysql = require('mysql');

// Create connection
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'AllClubs'
});

//Connect to the database
// con.connect(function (err) {
//     if (err) throw err;
//     console.log('Connected to the database!');

//     // Create 'Aerokle_tb' table
//     var createAerokleTable = `
//     CREATE TABLE Aerokle_tb (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       file_name VARCHAR(255) NOT NULL,
//       file_path VARCHAR(255) NOT NULL,
//       uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );
//     `;
    
//     con.query(createAerokleTable, function (err, result) {
//         if (err) throw err;
//         console.log('Aerokle_tb table created!');
//     });

//     // Close the connection after table creation
//     // con.end(function (err) {
//     //     if (err) throw err;
//     //     console.log('Connection closed.');
//     // });
// });

// Connect to the database
con.connect(function (err) {
    if (err) throw err;
    console.log('Connected to the database!');

    // Alter the table to add a new column for file caption
    var alterTable = `
    ALTER TABLE Aerokle_tb
    ADD COLUMN file_caption VARCHAR(255) NOT NULL DEFAULT '';
    `;

    con.query(alterTable, function (err, result) {
        if (err) throw err;
        console.log('file_caption column added to Aerokle_tb!');
    });

    // Close the connection after altering the table
    con.end(function (err) {
        if (err) throw err;
        console.log('Connection closed.');
    });
});