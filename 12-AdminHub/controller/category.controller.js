const Category = require("../model/category.model");
const SubCategory = require("../model/subcategory.model");
const ExtraCategory = require("../model/extracategory.model");
const Product = require("../model/product.model");
const fs = require('fs');

module.exports.addCategoryPage = (req, res) => {
    const admin = req.user;
    return res.render("category/addCategoryPage", { admin, currentPath: req.path });
}

module.exports.addCategory = async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    try {
        req.body.category_image = req.file.path;

        const newCategory = await Category.create(req.body);

        if (newCategory) {
            req.flash("success", "Category added successfully..");
        } else {
            req.flash("error", "Category addtion failed..");
        }

        return res.redirect('/category/addCategoryPage');
    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/category/addCategoryPage');
    }
}

module.exports.viewCategoriesPage = async (req, res) => {
    try {
        const admin = req.user;
        const allCategory = await Category.find();
        console.log(allCategory);
        return res.render('category/viewCategoryPage', { allCategory, admin, currentPath: req.path });
    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/category/viewCategoriesPage');
    }
}

module.exports.deleteCategory = async (req, res) => {
    try {
        console.log(req.query);
        const categoryId = req.query.categoryId;

        // Find category first
        const deletedCategory = await Category.findById(categoryId);
        if (!deletedCategory) {
            req.flash('error', 'Category not found');
            return res.redirect('/category/viewCategoriesPage');
        }

        // Find all subcategories under this category
        const subCategories = await SubCategory.find({ category_id: categoryId });
        const subCategoryIds = subCategories.map(sub => sub._id);

        // Find all extra categories under these subcategories
        const extraCategories = await ExtraCategory.find({ subcategory_id: { $in: subCategoryIds } });
        const extraCategoryIds = extraCategories.map(extra => extra._id);

        // Find and delete all products
        const products = await Product.find({ category_id: categoryId });
        products.forEach(product => {
            if (product.product_image && fs.existsSync(product.product_image)) {
                fs.unlinkSync(product.product_image);
            }
        });
        await Product.deleteMany({ category_id: categoryId });

        // Delete extra categories
        await ExtraCategory.deleteMany({ subcategory_id: { $in: subCategoryIds } });

        // Delete subcategories
        await SubCategory.deleteMany({ category_id: categoryId });

        // Delete category and its image
        await Category.findByIdAndDelete(categoryId);
        if (deletedCategory.category_image && fs.existsSync(deletedCategory.category_image)) {
            fs.unlinkSync(deletedCategory.category_image);
        }

        req.flash('success', `${deletedCategory.category_name} and all related data deleted successfully`);
        return res.redirect('/category/viewCategoriesPage');

    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Error : ", err);
        return res.redirect('/category/viewCategoriesPage');
    }
}

module.exports.editCategoryPage = async (req, res) => {
    try {
        console.log(req.params);
        const admin = req.user;
        const singleCategory = await Category.findById(req.params.categoryId);

        return res.render('category/editCategoryPage', { singleCategory, admin, currentPath: req.path });

    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/category/viewCategoriesPage');
    }
}

module.exports.editCategory = async (req, res) => {
    try {
        console.log(req.params);
        console.log(req.body);
        console.log(req.file);

        if (req.file) {
            req.body.category_image = req.file.path;
        }

        const updateCategory = await Category.findByIdAndUpdate(req.params.categoryId, req.body);

        if (updateCategory) {
            if (req.file) fs.unlink(updateCategory.category_image, () => { });

            req.flash('success', `Category is updated`);
        } else {
            req.flash('error', `Category is updation failed`);
        }

        return res.redirect('/category/viewCategoriesPage');


    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/category/viewCategoriesPage');
    }
}