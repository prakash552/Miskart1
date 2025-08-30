import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // productData से stock निकालने के लिए helper (assume globally imported productsData)
  const getProductStock = (id) => {
    // productsData को import करें जहां CartContext है
    // import productsData from '../data/productsData.js';
    // नीचे की लाइन को उसी तरह एडजस्ट करें
    const prod = window.productsData?.find((p) => p.id === id); // अगर global है तो, नहीं तो import करलें
    return prod ? prod.quantity : 99;
  };

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const exists = prevItems.find(item => item.id === product.id);
      if (exists) {
        if (exists.quantity < getProductStock(product.id)) {
          return prevItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return prevItems;
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    navigate('/cart');
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev =>
      prev
        .map(item => {
          const stock = getProductStock(item.id);
          return item.id === id
            ? {
                ...item,
                quantity: Math.max(1, Math.min(item.quantity + delta, stock)),
              }
            : item;
        })
        .filter(item => item.quantity > 0)
    );
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeItem, updateQuantity, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
