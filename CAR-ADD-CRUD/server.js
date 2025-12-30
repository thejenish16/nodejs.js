const express = require('express');
require('./config/db_config');
const path = require('path');
const Car = require('./models/car-models');

const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));


app.get('/form', (req, res) => {
    res.render('form');
});

app.get('/', (req, res) => {
    Car.find()
        .then((cars) => {
            res.render('home', { cars });
        })
        .catch((error) => {
            res.render('home', error);
        });
});


app.post('/cars', (req, res) => {
    Car.create(req.body)
        .then(() => {
            console.log("Car Added 😄");
        })
        .catch((error) => {
            console.log("Car Add Failed 🥲", error);
        });

    res.redirect('/');
});


app.get('/car/:id', (req, res) => {
    const car = Car.findById(req.params.id)
        .then((car) => {
            res.render('home', { car });
        })
        .catch((error) => {
            console.log("Car Not Found ", error);
        });
});


app.get('/edit/:id', (req, res) => {
    const car = Car.findById(req.params.id)
        .then((car) => {
            res.render('edit', { car });
        })
        .catch((error) => {
            res.redirect('/', error);
        });
});


app.post('/update/:id', (req, res) => {
    Car.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            console.log("Car Updated 👍");
        })
        .catch((error) => {
            console.log("Car Update Failed ", error);
        });

    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    Car.findByIdAndDelete(req.params.id)
        .then(() => {
            console.log("Car Deleted 🗑️");
        })
        .catch((error) => {
            console.log("Car Delete Failed", error);
        });

    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
