import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from './components/Header'
import styles from "./styles/App.module.css";

/**
 * Main App Component
 * Provides the layout with Header and Router Outlet
 */
function App() {
  return (
   <div className={styles.appContainer}>
      <Header />
      <main className={styles.mainContent}>
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
     <footer className={styles.footer}>
        <p>&copy; 2024 ShoppyGlobe. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App