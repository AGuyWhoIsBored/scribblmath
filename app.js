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
const bodyParser = require('body-parser');
const mjAPI = require('mathjax-node');

// internal imports
const db = require('./js/dbController');

// initialize auth engine
const passportConfig = require('./js/passportAuthConfig');
passportConfig.init(passport, db.getUserByEmail, db.getUserById);
console.log("Passport auth engine initialized");

// configure express
app.set('view-engine', 'ejs');
app.use(express.static(__dirname + '/scribblmath-main/build')); // using react static
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: false }));
app.use(flash());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: 's'
}));

app.use(passport.initialize());
app.use(passport.session());

// configure MathJax
mjAPI.config({
    fontUrl: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/fonts/HTML-CSS'
});
mjAPI.start();

// server-wide data
var numUsers = 0;

/* TOP-LEVEL ROUTES */ 

// only have GET routes for two different CRA instances!
// using only one CRA w/ route handler on frontend and prerendering
// override router on login-protected pages to handle appropriately
app.get('/main', checkAuthenticated, (req, res) => res.sendFile(__dirname + '/scribblmath-main/build/index.html'));
app.get('/signup', checkNotAuthenticated, (req, res) => res.sendFile(__dirname + '/scribblmath-main/build/index.html'));

app.get('/getuserinfo', checkAuthenticated, (req, res) => res.json({ username: req.user.username, email: req.user.email, data: req.user.data }));

// MUST BE LAST!!
app.get('/*', (req, res) => res.sendFile(__dirname + '/scribblmath-main/build/index.html'));

/* POST ROUTES */

// https://github.com/mathjax/MathJax-demos-web
app.post('/nicemath', async (req, res) => 
{
    mjAPI.typeset({
        math: req.body.inputMath,
        format: 'TeX',
        mml: true
    }, function(data) {
        if (!data.errors) { res.json(data); }
        else { console.log("data for mathjax typesetting has some errors"); console.log(data.errors); }
    })
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/main',
    failureRedirect: '/login',
    failureFlash: true
}));

app.post('/signup', checkNotAuthenticated, async (req, res) => 
{
    console.log("hit signup post route");
    try 
    {
        // make sure that an account w/ the same email doesn't already exist
        const userLookup = await db.getUserByEmail(req.body.email);
        if (userLookup !== null)
        {
            console.log("new user attempted to make account with an existing email");
            res.redirect('/signup'); // INTERACT w/ REACT FRONTEND
        }
        else if (req.body.password !== req.body.passwordConfirm)
        {
            console.log("new user didn't match up passwords on registration attempt");
            res.redirect('/signup'); // INTERACT w/ REACT FRONTEND
        }
        else
        {
            const hashedPassword = await argon2.hash(req.body.password, { type: argon2.argon2id });
            // upload to database
            db.addUser(req.body.name, hashedPassword, req.body.email);
            req.flash('info', 'Account successfully created! Please login.'); // INTERACT w/ REACT FRONTEND
            res.redirect('/login');                                           // INTERACT w/ REACT FRONTEND
            console.log("account successfully created");
        }

    } catch (e) { console.log("AN ERROR OCCURRED!"); res.redirect('/signup'); /* INTERACT w/ REACT FRONTEND */ }
});

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

    // for webcam stream
    socket.on('join-room', (roomId, userId) => 
    {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId);

        socket.on('disconnect', () => 
        {
            socket.to(roomId).broadcast.emit('user-disconnected', userId);
        });
    });
});

console.log("Backend server listening on port 3000");
http.listen(3000);