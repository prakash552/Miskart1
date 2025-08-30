import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext.jsx';  // CartContext से import करें
import '../Styles/ProductGrid.css';

const ProductGrid = ({ products }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [wishlist, setWishlist] = React.useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product) => {
    addToCart(product);  // CartContext में product add करेगा
    // Cart page पर redirect कर देगा CartContext के addToCart में navigate फंक्शन के कारण
  };

  return (
    <div className="product-grid">
      {products.map((prod, index) => {
        const isWishlisted = wishlist.includes(prod.id);
        return (
          <div
            key={prod.id}
            className={`product-card slide-in-${index % 2 === 0 ? 'left' : 'right'}`}
          >
            {/* Wishlist */}
            <div
              className="wishlist-icon"
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(prod.id);
              }}
              role="button"
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') toggleWishlist(prod.id);
              }}
            >
              {isWishlisted ? (
                <FaHeart className="icon-filled" />
              ) : (
                <FaRegHeart className="icon-outline" />
              )}
            </div>

            {/* Product Image and info */}
            <div
              className="product-info"
              onClick={() => navigate(`/product/${prod.id}`)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') navigate(`/product/${prod.id}`);
              }}
            >
              <img src={prod.image} alt={prod.name} className="product-image" />
              <h3 className="product-name">{prod.name}</h3>
              <p className="product-price">₹{prod.price}</p>
            </div>

            {/* Add to Cart Button */}
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(prod)}>
              <FaShoppingCart />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
