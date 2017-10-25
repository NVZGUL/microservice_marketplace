const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression')
const flash = require('connect-flash')
const routes = require('./routes/index');
const auth = require('./routes/auth');
const admin = require('./routes/admin');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user');
const passportConf = require('./passport');

//passport.serializeUser((user, done) => done(null, user.id));
//passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));


let app = express();

app.use(session({
    store: new RedisStore({ client: redis.createClient(6379, 'redis') }),
    secret: 'basesessionopenner',
    name: 'passport_google',
    cookies: {
        secure: false,
        maxAge: 3600000,
    },
    saveUninitialized: false,
    resave: false
}));

app.use(cookieParser());
app.use(compression())
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
// View Engine
app.set('view engine', 'ejs');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/auth', auth);
app.use('/admin', admin);

passportConf(passport);

// Mongo connection
mongoose.connect('mongodb://mongo/user', { useMongoClient: true });
const db = mongoose.connection;

//db.once('open', () => console.log('Good to go'));
//db.on('error', (error) => console.warn('Warning', error));

module.exports = app;