var mysql = require('mysql');

// Create connection
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'AllClubs'
});

// Connect to the database  (remove comments and comments below code and run then comment this and remove comments of below code once again run) 
// con.connect(function (err) {
//     if (err) throw err;
//     console.log('Connected to the database!');

//     // Create 'upsc_img' table
//     var createUpscImgTable = `
//     CREATE TABLE upsc_img (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       image_name VARCHAR(255) NOT NULL,
//       image_path VARCHAR(255) NOT NULL,
//       upload_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );`;

//     con.query(createUpscImgTable, function (err, result) {
//         if (err) throw err;
//         console.log('upsc_img table created!');
//     });

//     // Create 'upsc_files' table
//     var createUpscFilesTable = `
//     CREATE TABLE upsc_files (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       file_name VARCHAR(255) NOT NULL,
//       file_path VARCHAR(255) NOT NULL,
//       upload_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );`;

//     con.query(createUpscFilesTable, function (err, result) {
//         if (err) throw err;
//         console.log('upsc_files table created!');
//     });

//     // Close the connection after table creation
//     con.end(function (err) {
//         if (err) throw err;
//         console.log('Connection closed.');
//     });
// });

con.connect(function (err) {
    if (err) throw err;
    console.log('Connected to the database!');

    // Alter the table to add a new column for file caption
    var alterTable = `
    ALTER TABLE upsc_files
    ADD COLUMN file_caption VARCHAR(255) NOT NULL DEFAULT '';
    `;

    con.query(alterTable, function (err, result) {
        if (err) throw err;
        console.log('file_caption column added to upsc_tb!');
    });

    // Close the connection after altering the table
    con.end(function (err) {
        if (err) throw err;
        console.log('Connection closed.');
    });
});
