import React, { useState, useEffect } from 'react';
import '../Styles/CategoryFilter.css';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'toys', name: 'Toys' },
  { id: 'decor', name: 'Decor' },
  { id: 'jewellery', name: 'Jewellery' },
  { id: 'stationeries', name: 'Stationeries' },
  { id: 'edible', name: 'Edible Gifts' },
  { id: 'books', name: 'Books' },
];

const CategoryFilter = ({ onChange, activeCategory }) => {
  const [active, setActive] = useState(activeCategory || 'all');

  useEffect(() => {
    if (activeCategory) {
      setActive(activeCategory);
    }
  }, [activeCategory]);

  const handleClick = (id) => {
    setActive(id);
    if (onChange) onChange(id);
  };

  return (
    <div className="category-filter-container" role="radiogroup" aria-label="Product Categories">
      {categories.map(cat => (
        <button
          key={cat.id}
          className={`category-btn ${active === cat.id ? 'active' : ''}`}
          onClick={() => handleClick(cat.id)}
          aria-pressed={active === cat.id}
          role="radio"
          tabIndex={active === cat.id ? 0 : -1}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
