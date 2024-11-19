const Product = require('../models/productModel');

const productController = {

  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.render('products/index', { products });  // Render the index view with all products
    } catch (error) {
      res.status(500).send('Error fetching products');
    }
  },

  // Get a product by ID
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).send('Product not found');
      }
      res.render('products/show', { product });  // Render the show view for a single product
    } catch (error) {
      res.status(500).send('Error fetching product');
    }
  }

};

module.exports = productController;