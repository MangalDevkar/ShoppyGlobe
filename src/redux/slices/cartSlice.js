import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add product to cart or increase quantity if already exists
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem) {
        // If product already in cart, increase quantity
        existingItem.quantity += 1;
      } else {
        // Add new product to cart
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          image: newItem.image,
          quantity: 1,
        });
      }

      // Recalculate totals
      state.totalQuantity += 1;
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    // Remove product from cart completely
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const itemToRemove = state.items.find(item => item.id === productId);

      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity;
        state.items = state.items.filter(item => item.id !== productId);
        state.totalPrice = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    },

    // Update quantity of a product (minimum 1)
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item) {
        // Ensure quantity doesn't go below 1
        const newQuantity = Math.max(1, quantity);
        const quantityDifference = newQuantity - item.quantity;

        item.quantity = newQuantity;
        state.totalQuantity += quantityDifference;
        state.totalPrice = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export const selectTotalPrice = (state) => state.cart.totalPrice;
export const selectCartItemCount = (state) => state.cart.items.length;

export default cartSlice.reducer;