// controllers/productController.js
const productModel = require('../models/productModel');

const createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, stock } = req.body;
    const product = await productModel.createProduct(name, description, price, imageUrl, stock);
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.json({ products });
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ product });
  } catch (error) {
    console.error('Error retrieving product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, imageUrl, stock } = req.body;
    const updatedProduct = await productModel.updateProduct(productId, name, description, price, imageUrl, stock);
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await productModel.deleteProduct(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};