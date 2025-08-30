import React, { useState, useEffect, useRef } from 'react';
import '../Styles/Banner.css';

const images = [
  '/8067486.jpg',
  '/9875554.jpg',
  '/7790406.jpg',
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => {
      resetTimeout();
    };
  }, [current]);

  return (
    <div className="banner">
      <div
        className="banner-slider"
        style={{ transform: `translateX(-${current * 100}vw)` }}  // vw units for full viewport width
        onMouseEnter={resetTimeout}
        onMouseLeave={() => {
          timeoutRef.current = setTimeout(() => {
            setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
          }, 5000);
        }}
      >
        {images.map((img, idx) => (
          <img key={idx} src={img} alt={`banner-${idx + 1}`} className="banner-image" />
        ))}
      </div>
      <div className="banner-dots">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`dot ${current === idx ? 'active' : ''}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
