// controllers/orderController.js
const orderModel = require('../models/orderModel');
const cartModel = require('../models/cartModel');

const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const cart = await cartModel.getCartByUserId(userId);
    if (!cart) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    const cartItems = await cartModel.getCartItems(cart.id);
    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    let totalAmount = 0;
    for (const item of cartItems) {
      const product = await productModel.getProductById(item.product_id);
      totalAmount += product.price * item.quantity;
    }

    const order = await orderModel.createOrder(userId, totalAmount, 'pending');

    for (const item of cartItems) {
      const product = await productModel.getProductById(item.product_id);
      await orderModel.addOrderItem(order.id, product.id, item.quantity, product.price);
    }

    await cartModel.clearCart(cart.id);

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.getAllOrders();
    res.json({ orders });
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await orderModel.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    const orderItems = await orderModel.getOrderItemsByOrderId(orderId);
    res.json({ order, orderItems });
  } catch (error) {
    console.error('Error retrieving order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    const updatedOrder = await orderModel.updateOrderStatus(orderId, status);
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order status updated successfully', order: updatedOrder });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  placeOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
};