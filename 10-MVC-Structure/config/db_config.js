
const mongoose = require('mongoose');

const URI = "mongodb://localhost:27017/EMP_Management";

mongoose.connect(URI).then(() => {
    console.log("DB Is Connected...");
}).catch(err => {
    console.log("DB Is Not Connected..", err);
});
