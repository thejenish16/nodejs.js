const express = require('express');
const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.use('/', express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, (err) => {
    if (err) {
        console.log("Server Is Not Started..", err);
    } else {
        console.log("Server IS Connected on http://localhost:8000");
    }
});