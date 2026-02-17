const express = require('express');
const { addSubCategoryPage, addSubCategory, viewSubCategoriesPage, deleteSubCategory, editSubCategoryPage, editSubCategory } = require('../controller/subCategory.controller');

const subCategoryRoute = express.Router();

subCategoryRoute.get('/addSubCategoryPage', addSubCategoryPage);
subCategoryRoute.post('/addSubCategory', addSubCategory);
subCategoryRoute.get('/viewSubCategoriesPage', viewSubCategoriesPage);
subCategoryRoute.get('/deleteSubCategory', deleteSubCategory);
subCategoryRoute.get('/editSubCategoryPage/:subCategoryId', editSubCategoryPage);
subCategoryRoute.post('/editSubCategory/:subCategoryId', editSubCategory);

module.exports = subCategoryRoute;