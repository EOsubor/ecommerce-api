// controllers/cartController.js
const cartModel = require('../models/cartModel');

const getCart = async (req, res) => {
  try {
    const userId = req.userId;
    let cart = await cartModel.getCartByUserId(userId);
    if (!cart) {
      cart = await cartModel.createCart(userId);
    }
    const cartItems = await cartModel.getCartItems(cart.id);
    res.json({ cart, cartItems });
  } catch (error) {
    console.error('Error retrieving cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addItemToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body;
    let cart = await cartModel.getCartByUserId(userId);
    if (!cart) {
      cart = await cartModel.createCart(userId);
    }
    const cartItem = await cartModel.addCartItem(cart.id, productId, quantity);
    res.status(201).json({ message: 'Item added to cart successfully', cartItem });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const { quantity } = req.body;
    const updatedCartItem = await cartModel.updateCartItem(cartItemId, quantity);
    if (!updatedCartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json({ message: 'Cart item updated successfully', cartItem: updatedCartItem });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const deletedCartItem = await cartModel.deleteCartItem(cartItemId);
    if (!deletedCartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json({ message: 'Cart item deleted successfully', cartItem: deletedCartItem });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getCart,
  addItemToCart,
  updateCartItem,
  deleteCartItem,
};