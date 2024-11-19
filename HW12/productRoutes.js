const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Routes for products (only showing data)
router.get('/', productController.getAllProducts);           // Get all products
router.get('/:id', productController.getProductById);       // Get a single product by ID

module.exports = router;