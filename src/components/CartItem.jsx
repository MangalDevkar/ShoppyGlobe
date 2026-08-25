import { useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice'
import styles from '../styles/CartItem.module.css'

/**
 * CartItem Component
 * Displays a single item in the shopping cart
 * Allows quantity adjustment and item removal
 */
function CartItem({ item }) {
  const dispatch = useDispatch()

  // Handle quantity increase
  const handleIncreaseQuantity = () => {
    dispatch(updateQuantity({
      id: item.id,
      quantity: item.quantity + 1,
    }))
  }

  // Handle quantity decrease
  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        id: item.id,
        quantity: item.quantity - 1,
      }))
    }
  }

  // Handle quantity input change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1
    if (value >= 1) {
      dispatch(updateQuantity({
        id: item.id,
        quantity: value,
      }))
    }
  }

  // Handle remove from cart
  const handleRemove = () => {
    if (window.confirm(`Remove ${item.title} from cart?`)) {
      dispatch(removeFromCart(item.id))
    }
  }

  const subtotal = (item.price * item.quantity).toFixed(2)

  return (
    <div className={styles.item}>
      {/* Product Image & Name */}
      <div className={styles.productInfo}>
        <img
          src={item.image}
          alt={item.title}
          className={styles.productImage}
          loading="lazy"
        />
        <div className={styles.productDetails}>
          <h3 className={styles.productTitle}>{item.title}</h3>
          <p className={styles.productPrice}>${item.price}</p>
        </div>
      </div>

      {/* Price */}
      <div className={styles.price}>
        ${item.price}
      </div>

      {/* Quantity Control */}
      <div className={styles.quantityControl}>
        <button
          className={styles.quantityBtn}
          onClick={handleDecreaseQuantity}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <input
          type="number"
          value={item.quantity}
          onChange={handleQuantityChange}
          className={styles.quantityInput}
          min="1"
        />
        <button
          className={styles.quantityBtn}
          onClick={handleIncreaseQuantity}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* Subtotal */}
      <div className={styles.subtotal}>
        ${subtotal}
      </div>

      {/* Remove Button */}
      <div className={styles.action}>
        <button
          className={styles.removeBtn}
          onClick={handleRemove}
          aria-label="Remove from cart"
          title="Remove item"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

export default CartItem