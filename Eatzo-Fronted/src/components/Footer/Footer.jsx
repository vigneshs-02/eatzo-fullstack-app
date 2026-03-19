import React from 'react'
import { Link, useNavigate, useLocation }
  from 'react-router-dom'
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter
} from 'react-icons/fa'
import {
  MdEmail,
  MdPhone,
  MdLocationOn
} from 'react-icons/md'
import './Footer.css'

const Footer = () => {

  const navigate = useNavigate()
  const location = useLocation()

  // ── Smart Navigation ───────────────────
  const handleNavClick = (sectionId) => {
    if (location.pathname === '/') {
      // Already on home → scroll directly
      const section =
        document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({
          behavior: 'smooth'
        })
      }
    } else {
      // On other page → go home first
      navigate('/')
      setTimeout(() => {
        const section =
          document.getElementById(sectionId)
        if (section) {
          section.scrollIntoView({
            behavior: 'smooth'
          })
        }
      }, 300)
    }
  }

  return (
    <footer className="footer" id="contact">

      {/* ── Main Footer ────────────────── */}
      <div className="footer-main">
        <div className="footer-main-container">

          {/* Column 1 — Brand */}
          <div className="footer-brand">
            <h2 className="footer-logo">
              EATZO
            </h2>
            <p className="footer-tagline-text">
              Experience Culinary Excellence
            </p>
            <p className="footer-about">
              Born from a passion for exceptional
              food and warm hospitality. We bring
              restaurant-quality dining experience
              to every home.
            </p>

            {/* Social */}
            <div className="footer-social">
              <p className="social-label">
                Follow Us
              </p>
              <div className="social-icons">
                
                 <a href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link">
                  <FaInstagram size={16} />
                </a>
                
                 <a href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link">
                  <FaFacebookF size={16} />
                </a>
                
                 <a href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link">
                  <FaTwitter size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2 — Explore */}
          <div className="footer-col">
            <h3 className="footer-col-title">
              Explore
            </h3>
            <ul className="footer-links">
              <li>
                <button
                  className="footer-link"
                  onClick={() => 
                    handleNavClick('home')}>
                  Home
                </button>
              </li>
              <li>
                <Link
                  to="/menu"
                  className="footer-link">
                  Our Menu
                </Link>
              </li>
              <li>
                <button
                  className="footer-link"
                  onClick={() => 
                    handleNavClick('about')}>
                  About Us
                </button>
              </li>
              <li>
                <button
                  className="footer-link"
                  onClick={() => 
                    handleNavClick('contact')}>
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 — Account */}
          <div className="footer-col">
            <h3 className="footer-col-title">
              Account
            </h3>
            <ul className="footer-links">
              <li>
                <Link
                  to="/cart"
                  className="footer-link">
                  My Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/myorders"
                  className="footer-link">
                  My Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/order"
                  className="footer-link">
                  Place Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div className="footer-col">
            <h3 className="footer-col-title">
              Get In Touch
            </h3>
            <div className="footer-contact">

              <div className="contact-item">
                <div className="contact-icon-box">
                  <MdLocationOn size={14} />
                </div>
                <p>123 Food Street,
                  Chennai, Tamil Nadu</p>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box">
                  <MdPhone size={14} />
                </div>
                <p>+91 98765 43210</p>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box">
                  <MdEmail size={14} />
                </div>
                <p>hello@eatzo.com</p>
              </div>

            </div>

            {/* Opening Hours */}
            <div className="opening-hours">
              <p className="hours-title">
                Opening Hours
              </p>
              <p className="hours-text">
                Mon - Sun: 10AM - 11PM
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* ── Bottom Bar ──────────────────── */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="footer-copyright">
            © 2024 <span>EATZO</span>.
            All rights reserved.
            Crafted with ❤️ in Chennai.
          </p>
          <div className="footer-bottom-links">
            <a href="#"
              className="bottom-link">
              Privacy Policy
            </a>
            <span className="bottom-dot">◆</span>
            <a href="#"
              className="bottom-link">
              Terms of Service
            </a>
            <span className="bottom-dot">◆</span>
            <a href="#"
              className="bottom-link">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer