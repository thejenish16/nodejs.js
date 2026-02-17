const mongoose = require('mongoose');
const URI = 'mongodb://localhost:27017/Admin-hub-session';

mongoose.connect(URI).then(() => {
    console.log("Database Connected Successfully");
}).catch((err) => {
    console.log("Database Connection Failed");
})

module.exports = mongoose;