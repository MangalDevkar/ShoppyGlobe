/**
 * Router Configuration
 * Implements dynamic routing with React Router v6
 * Routes: Home, Product Detail, Cart, Checkout, 404 Not Found
 * Features: Code splitting with lazy loading, error boundaries
 */
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import NotFound from '../components/NotFound';

// Lazy load components for code splitting
import { lazy } from 'react';

const Home = lazy(() => import('../components/ProductList'));
const ProductDetail = lazy(() => import('../components/ProductDetail'));
const Cart = lazy(() => import('../components/Cart'));
const Checkout = lazy(() => import('../components/Checkout'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'product/:id',
        element: <ProductDetail />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;