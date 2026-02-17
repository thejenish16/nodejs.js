const Category = require("../model/category.model");
const SubCategory = require("../model/subcategory.model");
const ExtraCategory = require("../model/extracategory.model");
const Product = require("../model/product.model");
const fs = require('fs');

module.exports.addSubCategoryPage = async (req, res) => {
    try {
        const admin = req.user;
        const allCategory = await Category.find();
        return res.render('subcategory/addSubCategoryPage', { allCategory, admin, currentPath: req.path });
    } catch (err) {
        console.log("Error : ", err);
        req.flash('error', "Something went wrong !!");
        return res.redirect('/subCategory/addSubCategoryPage');
    }
}

module.exports.addSubCategory = async (req, res) => {
    try {
        console.log(req.body);
        
        const newSubCategory = await SubCategory.create(req.body);
        
        if (newSubCategory) {
            req.flash("success", "Sub Category added successfully..");
        } else {
            req.flash("error", "Sub Category addition failed..");
        }
        
        return res.redirect('/subCategory/addSubCategoryPage');
    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/subCategory/addSubCategoryPage');
    }
}

module.exports.viewSubCategoriesPage = async (req, res) => {
    try {
        const admin = req.user;
        const allSubCategory = await SubCategory.find().populate('category_id');
        console.log(allSubCategory);
        return res.render('subcategory/viewSubCategoryPage', { allSubCategory, admin, currentPath: req.path });
    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/subCategory/viewSubCategoriesPage');
    }
}

module.exports.deleteSubCategory = async (req, res) => {
    try {
        console.log(req.query);
        const subCategoryId = req.query.subCategoryId;
        
        const deletedSubCategory = await SubCategory.findById(subCategoryId);
        if (!deletedSubCategory) {
            req.flash('error', 'SubCategory not found');
            return res.redirect('/subCategory/viewSubCategoriesPage');
        }

        // Delete all extra categories under this subcategory
        await ExtraCategory.deleteMany({ subcategory_id: subCategoryId });

        // Delete all products under this subcategory
        const products = await Product.find({ subcategory_id: subCategoryId });
        products.forEach(product => {
            if (product.product_image && fs.existsSync(product.product_image)) {
                fs.unlinkSync(product.product_image);
            }
        });
        await Product.deleteMany({ subcategory_id: subCategoryId });

        // Delete subcategory
        await SubCategory.findByIdAndDelete(subCategoryId);
        
        req.flash('success', 'SubCategory and all related data deleted successfully');
        return res.redirect('/subCategory/viewSubCategoriesPage');
    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Error : ", err);
        return res.redirect('/subCategory/viewSubCategoriesPage');
    }
}

module.exports.editSubCategoryPage = async (req, res) => {
    try {
        console.log(req.params);
        const admin = req.user;
        const singleSubCategory = await SubCategory.findById(req.params.subCategoryId);
        const allCategory = await Category.find();
        
        return res.render('subcategory/editSubCategoryPage', { singleSubCategory, allCategory, admin, currentPath: req.path });
        
    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/subCategory/viewSubCategoriesPage');
    }
}

module.exports.editSubCategory = async (req, res) => {
    try {
        console.log(req.params);
        console.log(req.body);
        
        const updateSubCategory = await SubCategory.findByIdAndUpdate(req.params.subCategoryId, req.body);
        
        if (updateSubCategory) {
            req.flash('success', `Sub Category is updated`);
        } else {
            req.flash('error', `Sub Category updation failed`);
        }
        
        return res.redirect('/subCategory/viewSubCategoriesPage');
        
    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/subCategory/viewSubCategoriesPage');
    }
}