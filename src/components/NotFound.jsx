/**
 * NotFound Component
 * Displays 404 error page for undefined routes
 * Features: Error message, helpful navigation links, decorative elements
 * Routes: Displayed for any undefined route in the application
 */
import { useNavigate } from 'react-router-dom'
import styles from '../styles/NotFound.module.css'

/**
 * NotFound Component
 * Displays a 404 error page for unknown routes
 */
function NotFound() {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        
        <h1 className={styles.title}>Page Not Found</h1>
        
        <p className={styles.description}>
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <div className={styles.errorDetails}>
          <p>
            <strong>What happened?</strong>
            <br />
            The URL you entered might be incorrect, or the page may have been removed.
          </p>
        </div>

        <div className={styles.suggestions}>
          <p><strong>Here are some helpful links instead:</strong></p>
          <ul>
            <li>
              <button 
                onClick={() => navigate('/')}
                className={styles.link}
              >
                → Go to Home Page
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate('/')}
                className={styles.link}
              >
                → Browse Products
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate('/cart')}
                className={styles.link}
              >
                → View Shopping Cart
              </button>
            </li>
          </ul>
        </div>

        <button 
          onClick={() => navigate('/')}
          className={styles.backBtn}
        >
          ← Back to Home
        </button>
      </div>

      <div className={styles.decoration}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
    </div>
  )
}

export default NotFound