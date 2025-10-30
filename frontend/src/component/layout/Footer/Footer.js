import React from "react";
import { FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section left">
        <h4>Get Our App</h4>
        <p>Download our app for Android and iOS devices</p>
        <div className="app-buttons">
          <img src={playStore} alt="Play Store" />
          <img src={appStore} alt="App Store" />
        </div>
      </div>

      <div className="footer-section center">
        <h1>ECOMMERCE</h1>
        <p>Your trusted store for high-quality products</p>
        <p className="copyright">
          &copy; {new Date().getFullYear()} Bunty Singh | All Rights Reserved
        </p>
      </div>

      <div className="footer-section right">
        <h4>Follow Us</h4>
        <div className="social-icons">
          <a href="https://instagram.com/BuntySingh" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <a href="https://youtube.com/BuntySingh" target="_blank" rel="noreferrer">
            <FaYoutube />
          </a>
          <a href="https://facebook.com/BuntySingh" target="_blank" rel="noreferrer">
            <FaFacebookF />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
