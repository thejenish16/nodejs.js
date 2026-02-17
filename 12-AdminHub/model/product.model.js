const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subcategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },
    extracategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExtraCategory',
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    product_image: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Product', productSchema, 'Product');
