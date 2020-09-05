// this is the main backend for SCRIBBL MATH
console.log("Starting SCRIBBL MATH backend");

// load env vars
require('dotenv').config();
console.log("DB_HOST", process.env.DB_HOST);
console.log("^^ if you see the correct host above, env vars are loaded ^^");

// external package imports
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
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

// server-wide data
var numUsers = 0;

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

/* SERVER-LEVEL SOCKET CODE */
io.on('connection', (socket) => 
{
    // for whiteboard
    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));

    // for chat
    var addedUser = false;

    socket.on('new message', data => 
    {
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });
    });

    socket.on('add user', username => 
    {
        if (addedUser) return;

        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });

        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });

    socket.on('typing', () => 
    {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    socket.on('stop typing', () => 
    {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    socket.on('disconnect', () => 
    {
        if (addedUser)
        {
            --numUsers;

            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });
});

console.log("Backend server listening on port 3000");
http.listen(3000);