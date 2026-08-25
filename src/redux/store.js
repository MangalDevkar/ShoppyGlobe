/**
 * Redux Store Configuration
 * Centralized state management for the entire application
 * Reducers: Cart management, Products management
 * Features: Redux DevTools integration, efficient state updates
 */
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});

export default store;