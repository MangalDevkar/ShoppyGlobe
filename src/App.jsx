import { Outlet, Suspense } from 'react-router-dom'
import Header from './components/Header'
import './App.module.css'

/**
 * Main App Component
 * Provides the layout with Header and Router Outlet
 */
function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <footer className="footer">
        <p>&copy; 2024 ShoppyGlobe. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App