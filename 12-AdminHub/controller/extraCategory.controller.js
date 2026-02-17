const Category = require("../model/category.model");
const SubCategory = require("../model/subcategory.model");
const ExtraCategory = require("../model/extracategory.model");
const Product = require("../model/product.model");
const fs = require('fs');

module.exports.addExtraCategoryPage = async (req, res) => {
    try {
        const admin = req.user;
        const allCategory = await Category.find();
        const allSubCategory = await SubCategory.find();
        const allProduct = await Product.find().populate('category_id').populate('subcategory_id');
        return res.render('extracategory/addExtraCategoryPage', { allCategory, allSubCategory, allProduct, admin, currentPath: req.path });
    } catch (err) {
        console.log("Error : ", err);
        req.flash('error', "Something went wrong !!");
        return res.redirect('/extraCategory/addExtraCategoryPage');
    }
}

module.exports.addExtraCategory = async (req, res) => {
    try {
        console.log(req.body);
        
        const newExtraCategory = await ExtraCategory.create(req.body);
        
        if (newExtraCategory) {
            req.flash("success", "Extra Category added successfully..");
        } else {
            req.flash("error", "Extra Category addition failed..");
        }
        
        return res.redirect('/extraCategory/addExtraCategoryPage');
    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/extraCategory/addExtraCategoryPage');
    }
}

module.exports.viewExtraCategoriesPage = async (req, res) => {
    try {
        const admin = req.user;
        const allExtraCategory = await ExtraCategory.find().populate({
            path: 'subcategory_id',
            populate: { path: 'category_id' }
        });
        console.log(allExtraCategory);
        return res.render('extracategory/viewExtraCategoryPage', { allExtraCategory, admin, currentPath: req.path });
    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/extraCategory/viewExtraCategoriesPage');
    }
}

module.exports.deleteExtraCategory = async (req, res) => {
    try {
        console.log(req.query);
        const extraCategoryId = req.query.extraCategoryId;
        
        const deletedExtraCategory = await ExtraCategory.findById(extraCategoryId);
        if (!deletedExtraCategory) {
            req.flash('error', 'Extra Category not found');
            return res.redirect('/extraCategory/viewExtraCategoriesPage');
        }

        // Delete all products under this extra category
        const products = await Product.find({ extracategory_id: extraCategoryId });
        products.forEach(product => {
            if (product.product_image && fs.existsSync(product.product_image)) {
                fs.unlinkSync(product.product_image);
            }
        });
        await Product.deleteMany({ extracategory_id: extraCategoryId });

        // Delete extra category
        await ExtraCategory.findByIdAndDelete(extraCategoryId);
        
        req.flash('success', 'Extra Category and all related products deleted successfully');
        return res.redirect('/extraCategory/viewExtraCategoriesPage');
    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Error : ", err);
        return res.redirect('/extraCategory/viewExtraCategoriesPage');
    }
}

module.exports.editExtraCategoryPage = async (req, res) => {
    try {
        console.log(req.params);
        const admin = req.user;
        const singleExtraCategory = await ExtraCategory.findById(req.params.extraCategoryId);
        const allCategory = await Category.find();
        const allSubCategory = await SubCategory.find();
        
        return res.render('extracategory/editExtraCategoryPage', { singleExtraCategory, allCategory, allSubCategory, admin, currentPath: req.path });
        
    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/extraCategory/viewExtraCategoriesPage');
    }
}

module.exports.editExtraCategory = async (req, res) => {
    try {
        console.log(req.params);
        console.log(req.body);
        
        const updateExtraCategory = await ExtraCategory.findByIdAndUpdate(req.params.extraCategoryId, req.body);
        
        if (updateExtraCategory) {
            req.flash('success', `Extra Category is updated`);
        } else {
            req.flash('error', `Extra Category updation failed`);
        }
        
        return res.redirect('/extraCategory/viewExtraCategoriesPage');
        
    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/extraCategory/viewExtraCategoriesPage');
    }
}
