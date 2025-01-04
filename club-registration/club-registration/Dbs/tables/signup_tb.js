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
    var createSignUpTable =`CREATE TABLE signup (
    id INT(11) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    semester VARCHAR(50) DEFAULT NULL,
    usn VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;`;
    
    con.query(createSignUpTable, function (err, result) {
        if (err) throw err;
        console.log('signup table created!');
    });

    // Close the connection after table creation
    // con.end(function (err) {
    //     if (err) throw err;
    //     console.log('Connection closed.');
    // });
});




