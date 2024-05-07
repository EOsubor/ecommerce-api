// models/userModel.js
const pool = require('../config/db');
const bcrypt = require('bcrypt');

const createUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
  const values = [username, email, hashedPassword];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const getUserById = async (userId) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const values = [userId];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const updateUser = async (userId, username, email) => {
  const query = 'UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *';
  const values = [username, email, userId];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const deleteUser = async (userId) => {
  const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
  const values = [userId];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser,
  deleteUser,
};