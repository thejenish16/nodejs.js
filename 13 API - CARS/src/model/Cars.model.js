const mongoose = require('mongoose');

const CarsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    ratings: {
        type: Number,
        required: true,
    },
    reviews: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Cars_Dealership', CarsSchema, 'Car_Dealership');