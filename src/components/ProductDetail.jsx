/**
 * ProductDetail Component
 * Displays comprehensive information about a single product
 * Features: Product fetching, quantity selector, add to cart
 * Route: Dynamic route with product ID parameter
 */
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { addToCart } from '../redux/slices/cartSlice'
import styles from '../styles/ProductDetail.module.css'

/**
 * ProductDetail Component
 * Displays detailed information about a single product
 * Fetches product data based on route parameter (product id)
 */
function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [product, setProduct] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [quantity, setQuantity] = React.useState(1)

  // Fetch product details
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`https://dummyjson.com/products/${id}`)
        setProduct(response.data)
        setError(null)
      } catch (err) {
        const errorMessage =
          err.response?.status === 404
            ? 'Product not found'
            : err.message === 'Network Error'
            ? 'Network connection failed'
            : err.message || 'Failed to fetch product details'
        setError(errorMessage)
        console.error('Error fetching product:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProductDetail()
    }
  }, [id])

  // Handle add to cart
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail,
      }))
    }
    alert(`${quantity} x ${product.title} added to cart!`)
    setQuantity(1)
  }

  // Handle quantity change
  const handleQuantityChange = (value) => {
    const newQuantity = parseInt(value) || 1
    setQuantity(Math.max(1, newQuantity))
  }

  // Loading state
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading product details...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          ← Back to Products
        </button>
        <div className={styles.error}>
          <h2>⚠️ {error}</h2>
          <p>The product you're looking for is not available.</p>
        </div>
      </div>
    )
  }

  // No product found
  if (!product) {
    return (
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          ← Back to Products
        </button>
        <div className={styles.error}>
          <h2>Product Not Found</h2>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <button className={styles.backBtn} onClick={() => navigate('/')}>
        ← Back to Products
      </button>

      <div className={styles.content}>
        {/* Product Image */}
        <div className={styles.imageSection}>
          <img
            src={product.images?.[0] || product.thumbnail}
            alt={product.title}
            className={styles.mainImage}
            loading="lazy"
          />
          {product.discountPercentage && (
            <div className={styles.discount}>
              -{product.discountPercentage}% OFF
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className={styles.detailsSection}>
          <h1 className={styles.title}>{product.title}</h1>

          {/* Rating */}
          <div className={styles.rating}>
            <span className={styles.stars}>★ {product.rating?.toFixed(1) || 'N/A'}</span>
            <span className={styles.reviews}>({product.reviews?.length || 0} reviews)</span>
          </div>

          {/* Price */}
          <div className={styles.priceSection}>
            <span className={styles.currentPrice}>${product.price}</span>
            {product.discountPercentage && (
              <span className={styles.originalPrice}>
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className={styles.description}>{product.description}</p>

          {/* Product Info */}
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Brand:</span>
              <span className={styles.value}>{product.brand || 'N/A'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Category:</span>
              <span className={styles.value}>{product.category}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Stock:</span>
              <span className={styles.value}>
                {product.stock > 0 ? (
                  <span className={styles.inStock}>{product.stock} available</span>
                ) : (
                  <span className={styles.outOfStock}>Out of Stock</span>
                )}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>SKU:</span>
              <span className={styles.value}>{product.sku || 'N/A'}</span>
            </div>
          </div>

          {/* Add to Cart Section */}
          <div className={styles.cartSection}>
            <div className={styles.quantityControl}>
              <label htmlFor="quantity">Quantity:</label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                className={styles.quantityInput}
              />
            </div>
            <button
              className={styles.addToCartBtn}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              🛒 Add to Cart
            </button>
          </div>

          {/* Warranty & Return */}
          <div className={styles.guaranteeSection}>
            <div className={styles.guaranteeItem}>
              <span>🔒</span>
              <p>Secure Purchase</p>
            </div>
            <div className={styles.guaranteeItem}>
              <span>🚚</span>
              <p>Free Shipping</p>
            </div>
            <div className={styles.guaranteeItem}>
              <span>↩️</span>
              <p>30-Day Returns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail