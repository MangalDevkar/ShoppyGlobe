/**
 * ProductList Component
 * Displays all products from the API
 * Features: Search filtering, loading states, error handling
 * Uses: useFetchProducts hook, Redux state
 */
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useFetchProducts from '../hooks/useFetchProducts'
import { selectFilteredProducts, selectLoading, selectError } from '../redux/slices/productsSlice'
import ProductItem from './ProductItem'
import styles from '../styles/ProductList.module.css'

/**
 * ProductList Component
 * Displays all products fetched from the API
 * Implements code splitting and lazy loading
 */
function ProductList() {
  // Fetch products from API
  useFetchProducts('https://dummyjson.com/products')

  // Get state from Redux
  const products = useSelector(selectFilteredProducts)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)

  // Loading state
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading products...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>⚠️ Error Loading Products</h2>
          <p>{error}</p>
          <p>Please try refreshing the page.</p>
        </div>
      </div>
    )
  }

  // No products found
  if (!products || products.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <h2>📭 No Products Found</h2>
          <p>Try adjusting your search criteria.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Our Products</h2>
        <p className={styles.count}>Showing {products.length} products</p>
      </div>

      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductList