// used to interact btwn. database and backend

const mysql = require('mysql');

const dbCon = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// establish connection to DB
dbCon.connect(err => 
{
    if (err) { console.log("An error occurred while trying to connect to the master database"); throw err; }
    console.log("Successfully connected to master database"); 
});

// DB manipulation functions
// data for now will always be null

function addUser(username, password, email)
{
    var sqlQuery = `INSERT INTO users (username, password, email, data) VALUES (?, ?, ?, ?)`;
    dbCon.query(sqlQuery, [ username, password, email, null ], (err, res) => 
    {
        if (err) throw err;
        console.log("User [" + username + "] successfully created");
    });
}

function getUserByEmail(email)
{
    return new Promise((resolve, reject) => 
    {
        var sqlQuery = `SELECT * FROM users WHERE email = ?`;
        dbCon.query(sqlQuery, [ email ], (err, res) => 
        {
            // only expecting array of a single user object (RowDataPacket)
            if (err) reject(new Error("an error has occurred while trying to get a user by email"));
            if (res.length === 0) { resolve(null); }
            if (res.length > 1) { reject(new Error("username email lookup returned more than one user")); }
            resolve(JSON.parse(JSON.stringify(res))[0]);
        });
    });
}

function getUserById(id)
{
    return new Promise((resolve, reject) => 
    {
        var sqlQuery = `SELECT * FROM users WHERE id = ?`;
        dbCon.query(sqlQuery, [ id ], (err, res) => 
        {
            if (err) reject(new Error("an error has occurred while trying to get a user by ID"));
            if (res.length === 0) { resolve(null); }
            if (res.length > 1) { reject(new Error("username id lookup returned more than one user")); }
            resolve(JSON.parse(JSON.stringify(res))[0]);
        });
    });
}

module.exports = 
{
    addUser: addUser,
    getUserByEmail: getUserByEmail,
    getUserById: getUserById
};