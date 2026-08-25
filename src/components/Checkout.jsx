import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems, selectTotalPrice, clearCart } from '../redux/slices/cartSlice'
import styles from '../styles/Checkout.module.css'

/**
 * Checkout Component
 * Displays checkout form and order summary
 * Handles order placement and cart clearing
 */
function Checkout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const totalPrice = useSelector(selectTotalPrice)
  const tax = totalPrice * 0.1
  const total = totalPrice + tax

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
  })

  const [orderPlaced, setOrderPlaced] = useState(false)
  const [errors, setErrors] = useState({})

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Invalid phone number'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State is required'
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required'
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
    else if (!/^\d{13,19}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Invalid card number'

    return newErrors
  }

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Place order
    setOrderPlaced(true)
    dispatch(clearCart())

    // Redirect to home after 3 seconds
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }

  // Empty cart check
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyCart}>
          <h2>Your cart is empty</h2>
          <p>Add products before checkout</p>
          <button onClick={() => navigate('/')} className={styles.continueBtn}>
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  // Order placed message
  if (orderPlaced) {
    return (
      <div className={styles.container}>
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>✓</div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your order.</p>
          <p className={styles.redirectText}>Redirecting to home page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1>Checkout</h1>

      <div className={styles.content}>
        {/* Checkout Form */}
        <div className={styles.formSection}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Shipping Information</h2>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? styles.inputError : ''}
                />
                {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? styles.inputError : ''}
                />
                {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? styles.inputError : ''}
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? styles.inputError : ''}
                />
                {errors.phone && <span className={styles.error}>{errors.phone}</span>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={errors.address ? styles.inputError : ''}
              />
              {errors.address && <span className={styles.error}>{errors.address}</span>}
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={errors.city ? styles.inputError : ''}
                />
                {errors.city && <span className={styles.error}>{errors.city}</span>}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="state">State *</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={errors.state ? styles.inputError : ''}
                />
                {errors.state && <span className={styles.error}>{errors.state}</span>}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="zipCode">Zip Code *</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={errors.zipCode ? styles.inputError : ''}
                />
                {errors.zipCode && <span className={styles.error}>{errors.zipCode}</span>}
              </div>
            </div>

            <h2 style={{ marginTop: '2rem' }}>Payment Information</h2>

            <div className={styles.formGroup}>
              <label htmlFor="cardNumber">Card Number *</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className={errors.cardNumber ? styles.inputError : ''}
              />
              {errors.cardNumber && <span className={styles.error}>{errors.cardNumber}</span>}
            </div>

            <button type="submit" className={styles.placeOrderBtn}>
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className={styles.summarySection}>
          <h2>Order Summary</h2>

          <div className={styles.cartItems}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.summaryItem}>
                <div className={styles.itemInfo}>
                  <span className={styles.itemTitle}>{item.title}</span>
                  <span className={styles.itemQty}>x{item.quantity}</span>
                </div>
                <span className={styles.itemPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.divider}></div>

          <div className={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Tax (10%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Shipping:</span>
            <span className={styles.free}>FREE</span>
          </div>

          <div className={styles.totalRow}>
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout