import React from 'react';
import '../Styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About GiftStore</h1>
      <p className="about-paragraph">
        Welcome to <strong>GiftStore</strong>, your premier destination for unique, thoughtful, and high-quality gifts.
        Whether you're celebrating a birthday, anniversary, festival, or just want to surprise a loved one,
        we offer an extensive range of handpicked products crafted with care and passion.
      </p>

      <h2 className="about-subtitle">Our Mission</h2>
      <p className="about-paragraph">
        At GiftStore, our mission is to make gift-giving a joyful and effortless experience.
        We strive to bring you the finest selection of gifts that convey your love, appreciation,
        and warmest wishes, ensuring every occasion is memorable.
      </p>

      <h2 className="about-subtitle">Why Choose Us?</h2>
      <ul className="about-list">
        <li>Curated Collections: We carefully select products that are unique, premium, and meaningful.</li>
        <li>Quality Assurance: Every gift is inspected to meet our high standards of craftsmanship and design.</li>
        <li>Eco-friendly Options: We offer sustainable and handmade products to support a greener planet.</li>
        <li>Fast & Reliable Shipping: Timely delivery with secure packaging to keep your gifts perfect.</li>
        <li>Excellent Customer Service: Our friendly support team is here to help you every step of the way.</li>
      </ul>

      <h2 className="about-subtitle">Our Story</h2>
      <p className="about-paragraph">
        Founded in 2025, GiftStore began as a small passion project to change how people find and give gifts.
        Over time, we’ve grown into a trusted brand known for quality, creativity, and heartfelt connections.
        From personalized keepsakes to luxury items, our aim remains the same: to spread joy through thoughtful gifting.
      </p>
    </div>
  );
};

export default About;
