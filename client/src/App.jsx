import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import LoginRegister from './pages/LoginRegister.jsx';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Footer from './Components/Footer';

// Wrapper component to conditionally render Navbar and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  // जब path /login हो तो Navbar और footer ना दिखाएं
  const hideNavFooterRoutes = ['/login'];

  const hideNavFooter = hideNavFooterRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <main>{children}</main>
      {!hideNavFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/login" element={<LoginRegister/>} />
                  <Route path="/product/:productId" element={<ProductDetails />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
