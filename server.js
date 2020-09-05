// this is the main backend for SCRIBBL MATH
console.log("Starting SCRIBBL MATH backend");

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

// internal imports
const db = require('./js/dbController');

// initialize auth engine
const passportConfig = require('./js/passportAuthConfig');
passportConfig.init(passport, db.getUserByEmail, db.getUserById);
console.log("Passport auth engine initialized");

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

app.use(passport.initialize());
app.use(passport.session());

/* TOP-LEVEL ROUTES */ 

app.get('/', (req, res) => res.sendFile(__dirname + '/public/test.html'));

/* MIDDLEWARE */ 
function checkAuthenticated(req, res, next)
{
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login'); // INTERACT w/ REACT FRONTEND
}

function checkNotAuthenticated(req, res, next)
{
    if (req.isAuthenticated()) { return res.redirect('/main'); } // INTERACT w/ REACT FRONTEND
    next(); 
}


console.log("Backend server listening on port 3000");
app.listen(3000);