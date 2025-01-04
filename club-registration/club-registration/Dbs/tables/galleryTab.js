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

    // Create 'gallery' table
    var createGalleryTable = `
   CREATE TABLE Gallery_tb (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image_name VARCHAR(255) NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  upload_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
    

    con.query(createGalleryTable, function (err, result) {
        if (err) throw err;
        console.log('Gallery table created!');
    });

    // Close the connection after table creation
    // con.end(function (err) {
    //     if (err) throw err;
    //     console.log('Connection closed.');
    // });
});

