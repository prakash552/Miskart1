import React, { useState, useEffect } from 'react';
import '../Styles/FilterSection.css';
import { FaStar, FaFilter } from 'react-icons/fa';

const priceOptions = [
  { id: '100-299', label: '₹100 - ₹299', range: [100, 299] },
  { id: '299-399', label: '₹299 - ₹399', range: [299, 399] },
  { id: '399-499', label: '₹399 - ₹499', range: [399, 499] },
  { id: '499-599', label: '₹499 - ₹599', range: [499, 599] },
  { id: '599-799', label: '₹599 - ₹799', range: [599, 799] },
];

const giftTypes = ['Handmade', 'Eco-friendly', 'Luxury', 'Personalized', 'Budget'];

const colors = [
  { name: 'Pastel', colorCode: '#AEC6CF' },
  { name: 'Black', colorCode: 'black' },
  { name: 'Metallic', colorCode: '#D4AF37' },
  { name: 'Neutral', colorCode: '#C0C0C0' },
];

const FilterSection = ({ onFilterChange }) => {
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedGiftTypes, setSelectedGiftTypes] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [fadeIn, setFadeIn] = useState(false);

  // New: mobile filter toggle
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setSelectedPrice(value);
    onFilterChange?.({ selectedPrice: value, selectedRating, selectedGiftTypes, selectedColor });
  };

  const handleRatingChange = (star) => {
    const newRating = star === selectedRating ? null : star;
    setSelectedRating(newRating);
    onFilterChange?.({ selectedPrice, selectedRating: newRating, selectedGiftTypes, selectedColor });
  };

  const toggleGiftType = (type) => {
    let updated;
    if (selectedGiftTypes.includes(type)) {
      updated = selectedGiftTypes.filter((t) => t !== type);
    } else {
      updated = [...selectedGiftTypes, type];
    }
    setSelectedGiftTypes(updated);
    onFilterChange?.({ selectedPrice, selectedRating, selectedGiftTypes: updated, selectedColor });
  };

  const handleColorSelect = (colorName) => {
    const newColor = selectedColor === colorName ? '' : colorName;
    setSelectedColor(newColor);
    onFilterChange?.({ selectedPrice, selectedRating, selectedGiftTypes, selectedColor: newColor });
  };

  // New: close filter on mobile when clicking outside
  useEffect(() => {
    if (!showMobileFilters) return;
    const handleClick = (e) => {
      if (e.target.closest('.filter-section')) return;
      setShowMobileFilters(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showMobileFilters]);

  return (
    <>
      {/* Toggle button for mobile */}
      <button
        className="filter-toggle-btn"
        onClick={() => setShowMobileFilters((v) => !v)}
      >
        <FaFilter style={{ marginRight: 8 }} />
        Filters
      </button>
      <aside
        className={`filter-section ${fadeIn ? 'fade-in' : ''} ${
          showMobileFilters ? 'show-mobile' : ''
        }`}
      >
        <h3 className="filter-title">Filter Products</h3>

        {/* Price Range */}
        <div className="filter-group">
          <label className="filter-label">Price Range</label>
          <div className="price-radio-group">
            {priceOptions.map((opt) => (
              <label key={opt.id} className="price-radio-label">
                <input
                  type="radio"
                  name="price"
                  value={opt.id}
                  checked={selectedPrice === opt.id}
                  onChange={handlePriceChange}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Minimum Rating */}
        <div className="filter-group">
          <label className="filter-label">Minimum Rating</label>
          <div className="rating-options" role="radiogroup" aria-label="Minimum rating filter">
            {[5, 4, 3, 2, 1].map((star) => (
              <button
                key={star}
                type="button"
                className={`rating-btn ${selectedRating === star ? 'active' : ''}`}
                onClick={() => handleRatingChange(star)}
                aria-pressed={selectedRating === star}
                aria-label={`${star} star${star > 1 ? 's' : ''} & up`}
              >
                {[...Array(star)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </button>
            ))}
          </div>
        </div>

        {/* Gift Type */}
        <div className="filter-group">
          <label className="filter-label">Gift Type</label>
          <div className="gift-type-list">
            {giftTypes.map((type) => (
              <label key={type} className="checkbox-label">
                <input
                  type="checkbox"
                  value={type}
                  checked={selectedGiftTypes.includes(type)}
                  onChange={() => toggleGiftType(type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Color Theme */}
        <div className="filter-group">
          <label className="filter-label">Color Theme</label>
          <div className="color-swatches">
            {colors.map((c) => (
              <button
                key={c.name}
                type="button"
                className={`color-swatch ${selectedColor === c.name ? 'selected' : ''}`}
                style={{ backgroundColor: c.colorCode }}
                onClick={() => handleColorSelect(c.name)}
                aria-label={c.name}
              />
            ))}
          </div>
        </div>

        {/* Add a close button for mobile */}
        <button
          className="filter-close-btn"
          onClick={() => setShowMobileFilters(false)}
        >
          Close
        </button>
      </aside>
    </>
  );
};

export default FilterSection;
