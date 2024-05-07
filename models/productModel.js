// models/productModel.js
const pool = require('../config/db');

const createProduct = async (name, description, price, imageUrl, stock) => {
  const query = 'INSERT INTO products (name, description, price, image_url, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [name, description, price, imageUrl, stock];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const getAllProducts = async () => {
  const query = 'SELECT * FROM products';
  const { rows } = await pool.query(query);
  return rows;
};

const getProductById = async (productId) => {
  const query = 'SELECT * FROM products WHERE id = $1';
  const values = [productId];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const updateProduct = async (productId, name, description, price, imageUrl, stock) => {
  const query = 'UPDATE products SET name = $1, description = $2, price = $3, image_url = $4, stock = $5 WHERE id = $6 RETURNING *';
  const values = [name, description, price, imageUrl, stock, productId];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const deleteProduct = async (productId) => {
  const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
  const values = [productId];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};