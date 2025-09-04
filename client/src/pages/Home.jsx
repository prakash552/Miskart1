import React, { useEffect, useState, useRef } from 'react';
import productsData from '../data/ProductsData';
import { FaCartPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext.jsx';
import '../Styles/Home.css';
import Banner from '../Components/Banner';
import SearchBarWithAutoComplete from '../Components/SearchBarWithAutoComplete';

const Home = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const { addToCart } = useCart();

  const filteredProducts = productsData.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const newArrivals = filteredProducts;

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // Animation state for offer banners
  const [showOffers, setShowOffers] = useState(false);
  const offerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!offerRef.current) return;
      const rect = offerRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        setShowOffers(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    // Trigger on mount in case already visible
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <div className="search-bar-wrapper">
        <SearchBarWithAutoComplete products={productsData} onSearch={setSearchTerm} />
      </div>

      <Banner />

      <section className="new-arrivals-section">
        <h2 className="section-title">New Arrivals / Latest Collections</h2>
        <div className="new-arrivals-grid">
          {newArrivals.length === 0 ? (
            <p>No new arrivals found.</p>
          ) : (
            newArrivals.map(({ id, name, image, price }) => (
              <div key={id} className="new-arrival-card">
                <img src={image} alt={name} className="new-arrival-image" />
                <h3>{name}</h3>
                <p>₹{price}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart({ id, name, price, image })}
                  aria-label={`Add ${name} to cart`}
                >
                  <FaCartPlus className="cart-icon" />
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Offer Section */}
      <section
        className="offer-section"
        ref={offerRef}
        aria-label="Special Sale Offers"
      >
        <div className={`offer-banner left-offer ${showOffers ? 'slide-in-left' : ''}`}>
          <img src="https://static.vecteezy.com/system/resources/previews/024/499/711/non_2x/flat-sale-background-with-big-sale-discount-vector.jpg" alt="Left Offer Banner" />
          {/* <div className="offer-text">
            <h3>Big Sale!</h3>
            <p>Up to 50% off on selected items.</p>
          </div> */}
        </div>
        <div className={`offer-banner right-offer ${showOffers ? 'slide-in-right' : ''}`}>
          <img src="https://www.shutterstock.com/image-vector/buy-1-get-free-banner-600nw-2484024593.jpg" alt="Right Offer Banner" />
          {/* <div className="offer-text">
            <h3>Limited Time!</h3>
            <p>Buy 1 Get 1 Free on gifts.</p>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Home;
