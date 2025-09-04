import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Styles/Categories.css';

import CategoryFilter from '../Components/CategoryFilter';
import FilterSection from '../Components/FilterSection';
import ProductGrid from '../Components/ProductGrid';

import productsData from '../data/ProductsData';

const useQuery = () => new URLSearchParams(useLocation().search);

const Categories = () => {
  const query = useQuery();
  const navigate = useNavigate();

  const searchTerm = query.get('search') || '';

  // Category selected state
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filters, setFilters] = useState({});

  // Set category based on search term to highlight category button
  useEffect(() => {
    if (searchTerm) {
      const matchedProduct = productsData.find(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matchedProduct) {
        setSelectedCategory(matchedProduct.category);
        setFilters(prev => ({ ...prev, searchTerm }));
      } else {
        setSelectedCategory('all');
        setFilters(prev => ({ ...prev, searchTerm: '' }));
      }
    } else {
      setSelectedCategory('all');
      setFilters(prev => ({ ...prev, searchTerm: '' }));
    }
  }, [searchTerm]);

  // Reset filters helper function
  const resetFilters = () => {
    setSelectedCategory('all');
    setFilters({});
    navigate('/categories');
  };

  // Filter products based on category and filters
  const filteredProducts = useMemo(() => {
    let filtered = productsData;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (filters.selectedPrice) {
      const [min, max] = filters.selectedPrice.split('-').map(Number);
      filtered = filtered.filter(p => p.price >= min && p.price <= max);
    }

    if (filters.selectedRating) {
      filtered = filtered.filter(p => p.rating >= filters.selectedRating);
    }

    if (filters.selectedGiftTypes && filters.selectedGiftTypes.length > 0) {
      filtered = filtered.filter(p =>
        filters.selectedGiftTypes.includes(p.giftType)
      );
    }

    if (filters.selectedColor) {
      filtered = filtered.filter(p => p.colorTheme === filters.selectedColor);
    }

    if (filters.searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, filters]);

  return (
    <div className="categories-page-container">
      <FilterSection onFilterChange={setFilters} filters={filters} />

      <div className="categories-main-content">
        <CategoryFilter onChange={setSelectedCategory} activeCategory={selectedCategory} />

        <div className="categories-control-bar">
          <h2 className="categories-title" style={{ marginTop: '1rem' }}>
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            {selectedCategory !== 'all' && ` in "${selectedCategory}"`}
          </h2>

          <button className="reset-filters-btn" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <p style={{ color: '#550000', textAlign: 'center', marginTop: '2rem' , padding:'1rem', fontSize:'1.2rem'}}>
              No products found for selected filters.
            </p>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </div>
    </div>
  );
};

export default Categories;
