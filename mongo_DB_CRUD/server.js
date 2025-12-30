const express = require('express');
require('./config/db_config');
const Book = require('./models/book-models');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.render('form');
});

app.post('/books', async (req, res) => {
    console.log(req.body);
    
    const bookAdded = await Book.create(req.body);
    
    if (bookAdded) {
        console.log("Book inserted Successfully...");
        return res.redirect('/');
    } else {
        console.log("Book insertion failed...");
    }
});

app.listen(3000, (error) => {
    if (error)
        console.log(error);

    console.log("Server Is Started Successfully!");

});



