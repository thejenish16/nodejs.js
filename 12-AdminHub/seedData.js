const mongoose = require('mongoose');
const Category = require('./model/category.model');
const SubCategory = require('./model/subcategory.model');

const URI = 'mongodb://localhost:27017/Admin-hub-session';
mongoose.connect(URI);

const seedData = async () => {
    try {
        // Clear existing data
        await Category.deleteMany({});
        await SubCategory.deleteMany({});

        // Create Categories
        const categories = await Category.insertMany([
            { category_name: 'Clothes', category_image: '' },
            { category_name: 'Shoes', category_image: '' },
            { category_name: 'Electronics', category_image: '' },
            { category_name: 'Furniture', category_image: '' },
            { category_name: 'Books', category_image: '' },
            { category_name: 'Sports', category_image: '' }
        ]);

        console.log('Categories created:', categories.length);

        // Create SubCategories
        const subCategories = [
            // Clothes subcategories
            { category_id: categories[0]._id, subcategory_name: 'Men Wear' },
            { category_id: categories[0]._id, subcategory_name: 'Women Wear' },
            { category_id: categories[0]._id, subcategory_name: 'Kids Wear' },
            
            // Shoes subcategories
            { category_id: categories[1]._id, subcategory_name: 'Casual Shoes' },
            { category_id: categories[1]._id, subcategory_name: 'Sports Shoes' },
            { category_id: categories[1]._id, subcategory_name: 'Formal Shoes' },
            
            // Electronics subcategories
            { category_id: categories[2]._id, subcategory_name: 'Mobile Phones' },
            { category_id: categories[2]._id, subcategory_name: 'Laptops' },
            { category_id: categories[2]._id, subcategory_name: 'Headphones' },
            
            // Furniture subcategories
            { category_id: categories[3]._id, subcategory_name: 'Bedroom' },
            { category_id: categories[3]._id, subcategory_name: 'Living Room' },
            { category_id: categories[3]._id, subcategory_name: 'Office' },
            
            // Books subcategories
            { category_id: categories[4]._id, subcategory_name: 'Fiction' },
            { category_id: categories[4]._id, subcategory_name: 'Non-Fiction' },
            { category_id: categories[4]._id, subcategory_name: 'Educational' },
            
            // Sports subcategories
            { category_id: categories[5]._id, subcategory_name: 'Cricket' },
            { category_id: categories[5]._id, subcategory_name: 'Football' },
            { category_id: categories[5]._id, subcategory_name: 'Gym Equipment' }
        ];

        await SubCategory.insertMany(subCategories);
        console.log('SubCategories created:', subCategories.length);

        console.log('✅ Seed data inserted successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

seedData();
