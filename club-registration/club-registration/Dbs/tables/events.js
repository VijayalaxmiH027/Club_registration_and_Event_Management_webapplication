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
    var createAnnualDanceTable = `
   CREATE TABLE IF NOT EXISTS annual_dance_showcase (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  phone VARCHAR(15) NOT NULL,
  branch VARCHAR(255) NOT NULL,
  year VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  usn VARCHAR(255) NOT NULL,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
    `;

    var createCodeTable=`CREATE TABLE IF NOT EXISTS code_hackathon (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  phone VARCHAR(15) NOT NULL,
  branch VARCHAR(255) NOT NULL,
  year VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  usn VARCHAR(255) NOT NULL,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

    var createMusicTable=`CREATE TABLE IF NOT EXISTS music_night (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  phone VARCHAR(15) NOT NULL,
  branch VARCHAR(255) NOT NULL,
  year VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  usn VARCHAR(255) NOT NULL,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;
    
    var createUpscTable=`CREATE TABLE IF NOT EXISTS upsc_seminar (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  phone VARCHAR(15) NOT NULL,
  branch VARCHAR(255) NOT NULL,
  year VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  usn VARCHAR(255) NOT NULL,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

var createMilitaryTable=`CREATE TABLE IF NOT EXISTS military_career_guidance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  phone VARCHAR(15) NOT NULL,
  branch VARCHAR(255) NOT NULL,
  year VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  usn VARCHAR(255) NOT NULL,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
 var createPhotoTable=`CREATE TABLE IF NOT EXISTS photography_workshop (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  phone VARCHAR(15) NOT NULL,
  branch VARCHAR(255) NOT NULL,
  year VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  usn VARCHAR(255) NOT NULL,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

var createLiteraryTable=`CREATE TABLE IF NOT EXISTS literary_fest (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  phone VARCHAR(15) NOT NULL,
  branch VARCHAR(255) NOT NULL,
  year VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  usn VARCHAR(255) NOT NULL,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;
con.query(createLiteraryTable, function (err, result) {
    if (err) throw err;
    console.log('Aerokle_tb table created!');
});
con.query(createMilitaryTable, function (err, result) {
    if (err) throw err;
    console.log('Aerokle_tb table created!');
});
con.query(createPhotoTable, function (err, result) {
    if (err) throw err;
    console.log('Aerokle_tb table created!');
});

    con.query(createAnnualDanceTable, function (err, result) {
        if (err) throw err;
        console.log('Aerokle_tb table created!');
    });

    con.query(createCodeTable, function (err, result) {
        if (err) throw err;
        console.log('Aerokle_tb table created!');
    });

    con.query(createMusicTable, function (err, result) {
        if (err) throw err;
        console.log('Aerokle_tb table created!');
    });

    con.query(createUpscTable, function (err, result) {
        if (err) throw err;
        console.log('Aerokle_tb table created!');
    });
    // Close the connection after table creation
    // con.end(function (err) {
    //     if (err) throw err;
    //     console.log('Connection closed.');
    // });
});
