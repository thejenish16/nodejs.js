const { error } = require('console');
const express = require('express');

const app = express();
const port = 8000;

// Database connection
require('./config/db_config');

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/', require('./routes/'));


app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server is running ${port}`);
    }

    console.log("Server is start...");

});