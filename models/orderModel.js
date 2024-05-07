// models/orderModel.js
const pool = require('../config/db');

const createOrder = async (userId, totalAmount, status) => {
  const query = 'INSERT INTO orders (user_id, total_amount, status) VALUES ($1, $2, $3) RETURNING *';
  const values = [userId, totalAmount, status];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const addOrderItem = async (orderId, productId, quantity, price) => {
  const query = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [orderId, productId, quantity, price];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const getAllOrders = async () => {
  const query = 'SELECT * FROM orders';
  const { rows } = await pool.query(query);
  return rows;
};

const getOrderById = async (orderId) => {
  const query = 'SELECT * FROM orders WHERE id = $1';
  const values = [orderId];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const getOrderItemsByOrderId = async (orderId) => {
  const query = 'SELECT * FROM order_items WHERE order_id = $1';
  const values = [orderId];
  const { rows } = await pool.query(query, values);
  return rows;
};

const updateOrderStatus = async (orderId, status) => {
  const query = 'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *';
  const values = [status, orderId];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

module.exports = {
  createOrder,
  addOrderItem,
  getAllOrders,
  getOrderById,
  getOrderItemsByOrderId,
  updateOrderStatus,
};