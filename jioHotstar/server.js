const express = require('express');
const path = require('path');
require('./config/db.config');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/', require('./routes/video.route.js'));

app.listen(PORT, (err) => {
    if (err) {
        console.error("Server startup error:", err);
        return;
    }
    console.log(`Server running on http://localhost:${PORT}`);
});