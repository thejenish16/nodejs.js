const express = require('express');
const { addProductPage, addProduct, viewProductsPage, deleteProduct, editProductPage, editProduct } = require('../controller/product.controller');
const upload = require('../middleware/product.multer.middleware');

const productRoute = express.Router();

productRoute.get('/addProductPage', addProductPage);
productRoute.post('/addProduct', upload.single('product_image'), addProduct);
productRoute.get('/viewProductsPage', viewProductsPage);
productRoute.get('/deleteProduct', deleteProduct);
productRoute.get('/editProductPage/:productId', editProductPage);
productRoute.post('/editProduct/:productId', upload.single('product_image'), editProduct);

module.exports = productRoute;
