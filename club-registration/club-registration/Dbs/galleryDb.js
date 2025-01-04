var mysql = require('mysql');

var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: ''
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySQL.");
    
    // Create AllClubs database
    con.query('CREATE DATABASE IF NOT EXISTS AllClubs', function (err, result) {
        if (err) throw err;
        console.log("Database 'AllClubs' created or already exists.");
    });

    con.end(); // Close the connection after operation
});
