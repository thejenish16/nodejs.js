const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    fuel: {
        type: String,
        default: 'Petrol'
    },
    transmission: {
        type: String,
        default: 'Automatic'
    },
    engine: {
        type: String,
        default: 'N/A'
    },
    status: {
        type: String,
        default: 'Available'
    },
    image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
    },
    description: {
        type: String,
        default: 'Premium luxury vehicle'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Car', carSchema);