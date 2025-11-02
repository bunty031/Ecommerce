import React from "react";
import { FaInstagram, FaYoutube, FaFacebookF, FaGithub, FaLinkedin } from "react-icons/fa";
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
        <h1>ECOMMERCEBUY</h1>
        <p>Your trusted store for high-quality products</p>
        <p className="copyright">
          &copy; {new Date().getFullYear()} Bunty Singh | All Rights Reserved
        </p>
      </div>

      <div className="footer-section right">
        <h4>Follow Us</h4>
        <div className="social-icons">
          <a href="https://instagram.com/anxrudh_28" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <a href="https://youtube.com/@BuntySingh-e2n" target="_blank" rel="noreferrer">
            <FaYoutube />
          </a>
          <a href="https://github.com/bunty031" target="_blank" rel="noreferrer">
            <FaGithub />
              </a>
            <a href="https://www.linkedin.com/in/bunty-singh-431389332?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;
