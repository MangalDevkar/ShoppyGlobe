import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartItems, selectTotalPrice, selectTotalQuantity } from '../redux/slices/cartSlice'
import CartItem from './CartItem'
import styles from '../styles/Cart.module.css'

/**
 * Cart Component
 * Displays all items in the shopping cart
 * Shows cart summary and checkout option
 */
function Cart() {
  const cartItems = useSelector(selectCartItems)
  const totalPrice = useSelector(selectTotalPrice)
  const totalQuantity = useSelector(selectTotalQuantity)

  // Empty cart state
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className={styles.container}>
        <h1>Shopping Cart</h1>
        <div className={styles.emptyCart}>
          <div className={styles.emptyIcon}>🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <Link to="/" className={styles.continueShopping}>
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1>Shopping Cart</h1>

      <div className={styles.content}>
        {/* Cart Items */}
        <div className={styles.cartItems}>
          <div className={styles.itemsHeader}>
            <span>Products</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
            <span>Action</span>
          </div>
          
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Cart Summary */}
        <div className={styles.summary}>
          <h2>Order Summary</h2>
          
          <div className={styles.summaryRow}>
            <span>Total Items:</span>
            <span>{totalQuantity}</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Shipping:</span>
            <span className={styles.free}>FREE</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Tax (estimated):</span>
            <span>${(totalPrice * 0.1).toFixed(2)}</span>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.totalRow}>
            <span>Total:</span>
            <span>${(totalPrice + totalPrice * 0.1).toFixed(2)}</span>
          </div>

          <Link to="/checkout" className={styles.checkoutBtn}>
            Proceed to Checkout
          </Link>

          <Link to="/" className={styles.continueShopping}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart