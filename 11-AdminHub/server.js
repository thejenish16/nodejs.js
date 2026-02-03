const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./config/passport.config');
const path = require('path');
require('./config/db.config')
const app = express();
const port = 8000;

app.use(session({
    secret: 'admin-panel-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/Admin-hub-session'
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/upload', express.static(path.join(__dirname, 'upload')))

app.use('/', require('./routes/'))

app.listen(port, (err) => {
    if (err) {
        console.log("Server Is NOt Started");
        return false;
    }        

    console.log("Server Started Successfully In This Port http://localhost:8000");
})