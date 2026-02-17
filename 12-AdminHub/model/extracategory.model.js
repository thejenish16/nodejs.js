const mongoose = require('mongoose');

const extraCategorySchema = mongoose.Schema({
    subcategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },
    extracategory_name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ExtraCategory', extraCategorySchema, 'ExtraCategory');
