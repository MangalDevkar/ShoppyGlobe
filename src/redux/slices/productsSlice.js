/**
 * Products Redux Slice
 * Manages products state, filtering, and search
 * Actions: setLoading, setProducts, setError, searchProducts, clearSearch
 * Selectors: All products, filtered products, search term, loading state
 */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  filteredItems: [],
  searchTerm: '',
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Set products from API
    setProducts: (state, action) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Set error message
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Search/Filter products
    searchProducts: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.searchTerm = searchTerm;

      if (searchTerm === '') {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(
          (product) =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
      }
    },

    // Clear search
    clearSearch: (state) => {
      state.searchTerm = '';
      state.filteredItems = state.items;
    },
  },
});

export const { setLoading, setProducts, setError, searchProducts, clearSearch } =
  productsSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.items;
export const selectFilteredProducts = (state) => state.products.filteredItems;
export const selectSearchTerm = (state) => state.products.searchTerm;
export const selectLoading = (state) => state.products.loading;
export const selectError = (state) => state.products.error;

export default productsSlice.reducer;