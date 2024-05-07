// models/cartModel.js
const pool = require('../config/db');

const createCart = async (userId) => {
  const query = 'INSERT INTO carts (user_id) VALUES ($1) RETURNING *';
  const values = [userId];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const getCartByUserId = async (userId) => {
  const query = 'SELECT * FROM carts WHERE user_id = $1';
  const values = [userId];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const addCartItem = async (cartId, productId, quantity) => {
  const query = 'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
  const values = [cartId, productId, quantity];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const updateCartItem = async (cartItemId, quantity) => {
  const query = 'UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *';
  const values = [quantity, cartItemId];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const deleteCartItem = async (cartItemId) => {
  const query = 'DELETE FROM cart_items WHERE id = $1 RETURNING *';
  const values = [cartItemId];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const getCartItems = async (cartId) => {
  const query = 'SELECT * FROM cart_items WHERE cart_id = $1';
  const values = [cartId];
  const { rows } = await pool.query(query, values);
  return rows;
};

const clearCart = async (cartId) => {
  const query = 'DELETE FROM cart_items WHERE cart_id = $1';
  const values = [cartId];
  await pool.query(query, values);
};

module.exports = {
  createCart,
  getCartByUserId,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  getCartItems,
  clearCart,
};