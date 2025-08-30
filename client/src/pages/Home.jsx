import React from 'react';
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
    // Optional: Toast or animation for feedback
  };

  return (
    <div>
      <div className="search-bar-wrapper">
        <SearchBarWithAutoComplete products={productsData} onSearch={setSearchTerm} />
      </div>

      <Banner />

      <section className="new-arrivals-section">
        <h2 className = "section-title">New Arrivals / Latest Collections</h2>
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
    </div>
  );
};

export default Home;
