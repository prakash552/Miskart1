import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../data/ProductsData';
import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext.jsx';  // CartContext से addToCart
import '../Styles/ProductDetail.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const product = productsData.find((p) => p.id === productId);
  const { addToCart } = useCart();  // context से addToCart लें

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const isWishlisted = wishlist.includes(productId);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <Link to="/">Go back to Categories</Link>
      </div>
    );
  }

  const toggleWishlist = () => {
    if (isWishlisted) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  // Updated: Context का addToCart use करें  
  const handleAddToCart = () => {
    addToCart(product);
    alert(`"${product.name}" added to cart!`);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} color="#d68614" />);
    }
    if (halfStar) {
      stars.push(
        <FaStar
          key="half"
          color="#d68614"
          style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)' }}
        />
      );
    }
    while (stars.length < 5) {
      stars.push(<FaStar key={`empty-${stars.length}`} color="#ccc" />);
    }
    return stars;
  };

  const relatedProducts = productsData.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="product-details-container">
      <div className="product-main">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="product-main-image" />
        </div>
        <div className="product-info-section">
          <h1 className="product-name">{product.name}</h1>

          <div className="product-meta">
            <span className="product-price">₹{product.price}</span>
            <div className="product-rating" aria-label={`Rating: ${product.rating} out of 5`}>
              {renderStars(product.rating)}
              <span className="rating-value">{product.rating.toFixed(1)}</span>
            </div>
            <span className="product-quantity">In stock: {product.quantity}</span>
          </div>

          <p className="product-description">{product.description}</p>
          <p><strong>Gift Type:</strong> {product.giftType}</p>
          <p><strong>Color Theme:</strong> {product.colorTheme}</p>

          <div className="product-action-buttons">
            <button
              type="button"
              className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
              onClick={toggleWishlist}
              aria-pressed={isWishlisted}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {isWishlisted ? <FaHeart /> : <FaRegHeart />} Wishlist
            </button>
            <button type="button" className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <section className="feedback-section">
        <h2>User Feedback</h2>
        {product.feedbacks.length === 0 ? (
          <p>No feedback yet.</p>
        ) : (
          product.feedbacks.map((fb, idx) => (
            <div key={idx} className="feedback-item">
              <div className="feedback-header">
                <span className="feedback-user">{fb.user}</span>
                <div className="feedback-rating" aria-label={`${fb.rating} stars`}>
                  {renderStars(fb.rating)}
                </div>
              </div>
              <p className="feedback-comment">"{fb.comment}"</p>
            </div>
          ))
        )}
      </section>

      <section className="related-products-section">
        <h2>Related Products</h2>
        <div className="related-products-grid">
          {relatedProducts.length === 0 ? (
            <p>No related products found.</p>
          ) : (
            relatedProducts.map((rp) => (
              <Link to={`/product/${rp.id}`} key={rp.id} className="related-product-card">
                <img src={rp.image} alt={rp.name} />
                <h4>{rp.name}</h4>
                <span>₹{rp.price}</span>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
