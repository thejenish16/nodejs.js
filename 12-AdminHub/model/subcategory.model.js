const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subcategory_name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('SubCategory', subCategorySchema, 'SubCategory');
