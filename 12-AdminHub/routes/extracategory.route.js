const express = require('express');
const { addExtraCategoryPage, addExtraCategory, viewExtraCategoriesPage, deleteExtraCategory, editExtraCategoryPage, editExtraCategory } = require('../controller/extraCategory.controller');

const extraCategoryRoute = express.Router();

extraCategoryRoute.get('/addExtraCategoryPage', addExtraCategoryPage);
extraCategoryRoute.post('/addExtraCategory', addExtraCategory);
extraCategoryRoute.get('/viewExtraCategoriesPage', viewExtraCategoriesPage);
extraCategoryRoute.get('/deleteExtraCategory', deleteExtraCategory);
extraCategoryRoute.get('/editExtraCategoryPage/:extraCategoryId', editExtraCategoryPage);
extraCategoryRoute.post('/editExtraCategory/:extraCategoryId', editExtraCategory);

module.exports = extraCategoryRoute;
