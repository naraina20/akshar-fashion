"use client";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBackgroundColor = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }

  };

  function show() {
    let element = document.getElementById("navbarSupportedContent");
    if (element.classList.contains("show")) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", changeBackgroundColor);
  }, []);

  return (
    <footer className="bg-dark text-light py-4">
  <div className="container">
    <div className="row">
      <div className="col-md-4">
        <h5>About Us</h5>
        <p>
          Welcome to our eCommerce store! We offer a wide variety of products to meet all your needs. Quality and customer satisfaction are our top priorities.
        </p>
      </div>

      <div className="col-md-4">
        <h5>Quick Links</h5>
        <ul className="list-unstyled">
          <li><a href="/products" className="text-light text-decoration-none">Shop</a></li>
          <li><a href="/about" className="text-light text-decoration-none">About Us</a></li>
          <li><a href="/contact" className="text-light text-decoration-none">Contact Us</a></li>
          <li><a href="/faq" className="text-light text-decoration-none">FAQs</a></li>
        </ul>
      </div>

      <div className="col-md-4">
        <h5>Follow Us</h5>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="https://facebook.com" target="_blank" className="text-light">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a href="https://twitter.com" target="_blank" className="text-light">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a href="https://instagram.com" target="_blank" className="text-light">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a href="https://linkedin.com" target="_blank" className="text-light">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <hr className="bg-light"/>

    <div className="text-center">
      <p className="mb-0">&copy; 2024 Your eCommerce Site. All rights reserved.</p>
    </div>
  </div>
</footer>

  );
};

export default Navbar;
