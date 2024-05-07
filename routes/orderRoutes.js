// routes/orderRoutes.js
const express = require('express');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, orderController.placeOrder);

module.exports = router;