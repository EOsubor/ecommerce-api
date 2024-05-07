// routes/cartRoutes.js
const express = require('express');
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, cartController.getCart);
router.post('/', authMiddleware, cartController.addItemToCart);
router.put('/:id', authMiddleware, cartController.updateCartItem);
router.delete('/:id', authMiddleware, cartController.deleteCartItem);

module.exports = router;