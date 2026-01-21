const express = require('express');
const Cookie = require('cookie-parser');
const path = require('path');
require('./config/db.config')
const app = express();
const port = 8000;

app.use(Cookie());
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