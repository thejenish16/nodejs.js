const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/BOOKS_SYSTEM';

mongoose.connect(dbURI)
    .then(() => {
        console.log('Database connection established successfully');
    }).catch((error) => {
        console.error('Database connection error:', error);
    }).finally(() => {
        console.log("Database connection finished");

    });