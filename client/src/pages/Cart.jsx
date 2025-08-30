import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import productsData from '../data/ProductsData.js';
import '../Styles/Cart.css';

const SHIPPING_CHARGE = 20;

const Cart = () => {
  const { cartItems, removeItem, updateQuantity } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const navigate = useNavigate();

  const getProductStock = id => {
    const prod = productsData.find(p => p.id === id);
    return prod ? prod.quantity : 99;
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = totalPrice + (cartItems.length > 0 ? SHIPPING_CHARGE : 0) - discount;

  const applyCoupon = () => {
    if (coupon === 'SAVE20') setDiscount(20);
    else setDiscount(0);
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    alert(`Payment successful with method: ${paymentMethod}\nGrand Total: ₹${grandTotal}\nThank you for your purchase!`);
    setPaymentMethod('');
    setShowPaymentSection(false);
  };

  const gotoProductDetails = (id) => navigate(`/product/${id}`);

  return (
    <div className="cart-main-area">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>
          Your cart is empty.{' '}
          <button className="go-shopping-btn" onClick={() => navigate('/')}>
            Start Shopping
          </button>
        </p>
      ) : (
        <div className="cart-flex-layout">
          <div className="cart-products-area">
            <ul className="cart-items">
              {cartItems.map(({ id, name, price, quantity, image }) => (
                <li key={id} className="cart-item">
                  <img
                    src={image}
                    alt={name}
                    className="cart-item-image"
                    style={{ cursor: 'pointer' }}
                    onClick={() => gotoProductDetails(id)}
                    tabIndex={0}
                    onKeyDown={e => { if (e.key === 'Enter') gotoProductDetails(id); }}
                  />
                  <div
                    className="cart-item-details"
                    style={{ cursor: 'pointer' }}
                    onClick={() => gotoProductDetails(id)}
                    tabIndex={0}
                    role="link"
                    onKeyDown={e => { if (e.key === 'Enter') gotoProductDetails(id); }}
                  >
                    <h3>{name}</h3>
                    <p>Price: ₹{price.toFixed(2)}</p>
                    <div className="quantity-box">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          updateQuantity(id, -1);
                        }}
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          updateQuantity(id, 1);
                        }}
                        disabled={quantity >= getProductStock(id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={e => {
                      e.stopPropagation();
                      removeItem(id);
                    }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="cart-billing-area">
            <div className="cart-summary modern-box">
              <h3>Bill Details</h3>
              <div className="summary-row">
                <span>Products Total:</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping Charge:</span>
                <span>₹{SHIPPING_CHARGE}</span>
              </div>
              {discount > 0 && (
                <div className="summary-row">
                  <span>Coupon Discount:</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="summary-row grand">
                <span>Grand Total:</span>
                <span>₹{grandTotal}</span>
              </div>
              <div className="coupon-row">
                <input
                  type="text"
                  placeholder="Coupon code (SAVE20)"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  className="coupon-input"
                />
                <button onClick={applyCoupon} className="apply-coupon-btn">
                  Apply
                </button>
              </div>
              {!showPaymentSection && (
                <button className="checkout-btn" onClick={() => setShowPaymentSection(true)}>
                  Proceed to Checkout
                </button>
              )}
              {showPaymentSection && (
                <div className="payment-section">
                  <h4>Select Payment Method</h4>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    Cash on Delivery
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                    />
                    Online Payment (Placeholder)
                  </label>
                  {paymentMethod === 'online' && (
                    <div className="online-payment-info">
                      <p>Redirecting to secure online payment gateway...</p>
                    </div>
                  )}
                  <button className="pay-btn" onClick={handlePayment}>
                    Pay Now
                  </button>
                  <button className="cancel-btn" onClick={() => setShowPaymentSection(false)}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

