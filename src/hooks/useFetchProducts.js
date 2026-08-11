import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setProducts, setLoading, setError } from '../redux/slices/productsSlice';

/**
 * Custom hook to fetch products from the API
 * @param {string} url - API endpoint URL
 * @returns {void}
 */
const useFetchProducts = (url) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(url);
        
        // Check if response has products property
        if (response.data && response.data.products) {
          dispatch(setProducts(response.data.products));
        } else {
          dispatch(setProducts(response.data));
        }
      } catch (error) {
        // Handle different error scenarios
        const errorMessage = 
          error.response?.status === 404
            ? 'Products not found'
            : error.message === 'Network Error'
            ? 'Network connection failed. Please check your internet.'
            : error.message || 'Failed to fetch products';
        
        dispatch(setError(errorMessage));
        console.error('Error fetching products:', error);
      }
    };

    if (url) {
      fetchProducts();
    }
  }, [url, dispatch]);
};

export default useFetchProducts;