/**
 * Header Component
 * Main navigation and search functionality
 * Features: Logo, search bar, navigation links, cart badge
 * Integrates: Redux for search state and cart count
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { searchProducts, clearSearch } from '../redux/slices/productsSlice'
import { selectCartItemCount } from '../redux/slices/cartSlice'
import styles from '../styles/Header.module.css'

/**
 * Header Component
 * Displays navigation menu, search bar, and shopping cart icon
 */
function Header() {
  const [searchInput, setSearchInput] = useState('')
  const dispatch = useDispatch()
  const cartItemCount = useSelector(selectCartItemCount)

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchInput(value)
    
    if (value.trim()) {
      dispatch(searchProducts(value))
    } else {
      dispatch(clearSearch())
    }
  }

  // Clear search
  const handleClearSearch = () => {
    setSearchInput('')
    dispatch(clearSearch())
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo/Brand */}
        <div className={styles.logo}>
          <Link to="/">
            <h1>ShoppyGlobe</h1>
          </Link>
        </div>

        {/* Search Bar */}
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          {searchInput && (
            <button
              onClick={handleClearSearch}
              className={styles.clearBtn}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
          <Link to="/cart" className={styles.cartLink}>
            🛒 Cart
            {cartItemCount > 0 && (
              <span className={styles.badge}>{cartItemCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header