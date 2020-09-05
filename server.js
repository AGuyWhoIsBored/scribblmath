// this is the main backend for SCRIBBL MATH

// load env vars
require('dotenv').config();
console.log("DB_HOST", process.env.DB_HOST);
console.log("^^ if you see the correct host above, env vars are loaded ^^");

// external package imports
const express = require('express');
const app = express();
const argon2 = require('argon2');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

// configure express
app.set('view-engine', 'ejs');
app.use(express.static('public'));
app.use(flash());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: 's'//,
    // cookie:
    // {
    //     secure: false,
    //     httpOnly: true,
    //     sameSite: "strict"
    // }
}));

app.get('/', (req, res) => res.send("Hello world!"));

console.log("Backend server listening on port 3000");
app.listen(3000);