const Category = require("../model/category.model");
const SubCategory = require("../model/subcategory.model");
const ExtraCategory = require("../model/extracategory.model");
const Product = require("../model/product.model");
const fs = require('fs');
const path = require('path');

module.exports.addProductPage = async (req, res) => {
    try {
        const admin = req.user;
        const allCategory = await Category.find();
        const allSubCategory = await SubCategory.find();
        const allExtraCategory = await ExtraCategory.find();
        return res.render('product/addProductPage', { allCategory, allSubCategory, allExtraCategory, admin, currentPath: req.path });
    } catch (err) {
        console.log("Error : ", err);
        req.flash('error', "Something went wrong !!");
        return res.redirect('/product/addProductPage');
    }
}

module.exports.addProduct = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);
        
        if (req.file) {
            req.body.product_image = req.file.path;
        }
        
        const newProduct = await Product.create(req.body);
        
        if (newProduct) {
            req.flash("success", "Product added successfully..");
        } else {
            req.flash("error", "Product addition failed..");
        }
        
        return res.redirect('/product/addProductPage');
    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/product/addProductPage');
    }
}

module.exports.viewProductsPage = async (req, res) => {
    try {
        const admin = req.user;
        const allProduct = await Product.find()
            .populate('category_id')
            .populate('subcategory_id')
            .populate('extracategory_id');
        console.log(allProduct);
        return res.render('product/viewProductPage', { allProduct, admin, currentPath: req.path });
    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/product/viewProductsPage');
    }
}

module.exports.deleteProduct = async (req, res) => {
    try {
        console.log(req.query);
        
        const deletedProduct = await Product.findByIdAndDelete(req.query.productId);
        
        if (deletedProduct && deletedProduct.product_image) {
            fs.unlinkSync(deletedProduct.product_image);
        }
        
        if (deletedProduct) {
            req.flash('success', `Product is deleted`);
        } else {
            req.flash('error', `Product deletion failed`);
        }
        
        return res.redirect('/product/viewProductsPage');
    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/product/viewProductsPage');
    }
}

module.exports.editProductPage = async (req, res) => {
    try {
        console.log(req.params);
        const admin = req.user;
        const singleProduct = await Product.findById(req.params.productId);
        const allCategory = await Category.find();
        const allSubCategory = await SubCategory.find();
        const allExtraCategory = await ExtraCategory.find();
        
        return res.render('product/editProductPage', { singleProduct, allCategory, allSubCategory, allExtraCategory, admin, currentPath: req.path });
        
    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/product/viewProductsPage');
    }
}

module.exports.editProduct = async (req, res) => {
    try {
        console.log(req.params);
        console.log(req.body);
        console.log(req.file);
        
        const oldProduct = await Product.findById(req.params.productId);
        
        if (req.file) {
            if (oldProduct.product_image) {
                fs.unlinkSync(oldProduct.product_image);
            }
            req.body.product_image = req.file.path;
        } else {
            req.body.product_image = oldProduct.product_image;
        }
        
        const updateProduct = await Product.findByIdAndUpdate(req.params.productId, req.body);
        
        if (updateProduct) {
            req.flash('success', `Product is updated`);
        } else {
            req.flash('error', `Product updation failed`);
        }
        
        return res.redirect('/product/viewProductsPage');
        
    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/product/viewProductsPage');
    }
}
