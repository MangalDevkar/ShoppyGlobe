import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/slices/cartSlice'
import styles from '../styles/ProductItem.module.css'

/**
 * ProductItem Component
 * Displays a single product card with image, name, price, rating
 * Includes "Add to Cart" button and link to product details
 */
function ProductItem({ product }) {
  const dispatch = useDispatch()

  // Handle add to cart
  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.thumbnail,
    }))
    // Optional: Show toast notification
    alert(`${product.title} added to cart!`)
  }

  return (
    <div className={styles.card}>
      {/* Product Image */}
      <div className={styles.imageWrapper}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.image}
          loading="lazy"
        />
        {product.discountPercentage && (
          <div className={styles.discount}>
            -{product.discountPercentage}%
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>

        {/* Rating */}
        <div className={styles.rating}>
          <span className={styles.stars}>★</span>
          <span className={styles.ratingValue}>
            {product.rating ? product.rating.toFixed(1) : 'N/A'}
          </span>
        </div>

        {/* Price */}
        <div className={styles.price}>
          <span className={styles.current}>${product.price}</span>
          {product.originalPrice && (
            <span className={styles.original}>
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className={styles.stock}>
          {product.stock > 0 ? (
            <span className={styles.inStock}>In Stock</span>
          ) : (
            <span className={styles.outOfStock}>Out of Stock</span>
          )}
        </div>

        {/* Buttons */}
        <div className={styles.buttons}>
          <button
            className={styles.addToCartBtn}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            🛒 Add to Cart
          </button>
          <Link
            to={`/product/${product.id}`}
            className={styles.viewBtn}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductItem