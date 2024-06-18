// cartController.js

const Cart = require('../models/cart');

const addToCart = async (userId, productId) => {
  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    cart.products.push(productId);
    await cart.save();

    return cart;
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
};

module.exports = { addToCart };
