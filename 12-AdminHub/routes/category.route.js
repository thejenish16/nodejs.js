const express = require('express');
const upload = require('../middleware/category.multer.middleware');
const { addCategoryPage, addCategory, viewCategoriesPage, deleteCategory, editCategoryPage, editCategory } = require('../controller/category.controller');

const categoryRoute = express.Router();

categoryRoute.get('/addCategoryPage', addCategoryPage);
categoryRoute.post('/addCategory', upload.single('category_image'), addCategory);
categoryRoute.get('/viewCategoriesPage', viewCategoriesPage);
categoryRoute.get('/deleteCategory', deleteCategory);
categoryRoute.get('/editCategoryPage/:categoryId', editCategoryPage);
categoryRoute.post('/editCategory/:categoryId', upload.single('category_image'), editCategory);

module.exports = categoryRoute;
