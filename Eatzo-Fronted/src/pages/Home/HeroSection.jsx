import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import heroFood from '../../assets/hero_food.jpg'
import './HeroSection.css';

// Typing animation texts
const typingTexts = [
  "Culinary Excellence.",
  "Fine Dining Experience.",
  "Unforgettable Flavors.",
  "Royal Taste Journey.",
]

const HeroSection = () => {

  const [displayText, setDisplayText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Typing animation logic
  useEffect(() => {
    const currentText = typingTexts[textIndex]

    const timeout = setTimeout(() => {

      if (!isDeleting) {
        // Typing forward
        setDisplayText(currentText
          .substring(0, charIndex + 1))
        setCharIndex(prev => prev + 1)

        // Finished typing → start deleting
        if (charIndex + 1 === currentText.length) {
          setTimeout(() => 
            setIsDeleting(true), 1500)
        }

      } else {
        // Deleting
        setDisplayText(currentText
          .substring(0, charIndex - 1))
        setCharIndex(prev => prev - 1)

        // Finished deleting → next text
        if (charIndex - 1 === 0) {
          setIsDeleting(false)
          setTextIndex(prev => 
            (prev + 1) % typingTexts.length)
        }
      }

    }, isDeleting ? 60 : 100)

    return () => clearTimeout(timeout)

  }, [charIndex, isDeleting, textIndex])

  return (
    <section className="hero">

      {/* Dark gold gradient background */}
      <div className="hero-bg"></div>

      <div className="hero-container">

        {/* LEFT SIDE — Text */}
        <div className="hero-left">

          <p className="hero-tagline">
            ✦ Welcome to Eatzo
          </p>

          <h1 className="hero-title">
            Experience
          </h1>

          {/* Typing animation */}
          <h1 className="hero-typing">
            {displayText}
            <span className="cursor">|</span>
          </h1>

          <p className="hero-description">
            A journey of flavor, artistry, and refined 
            ambiance — crafted for the discerning palate. 
            Reserve your table and experience the finest 
            culinary art.
          </p>

          {/* Buttons */}
          <div className="hero-buttons">
            <a href="#menu" 
               className="btn-primary">
              Explore Menu
            </a>
            <a href="#reservations" 
               className="btn-secondary">
              Reserve Table
            </a>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="stat">
              <h3>50+</h3>
              <p>Menu Items</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <h3>10K+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <h3>4.9★</h3>
              <p>Rating</p>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE — Floating Food Image */}
        <div className="hero-right">

          {/* Decorative gold circles */}
          <div className="gold-circle-1"></div>
          <div className="gold-circle-2"></div>

          {/* Floating image */}
          <div className="hero-image-wrapper">
            <img
              src={heroFood}
              alt="Signature Dish"
              className="hero-image"
            />
            {/* Gold border frame */}
            <div className="image-frame"></div>
          </div>

          {/* Floating badge */}
          <div className="floating-badge">
            <span className="badge-icon">🍽️</span>
            <div>
              <p className="badge-title">
                Chef's Special
              </p>
              <p className="badge-sub">
                Today's Recommendation
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <p>Scroll Down</p>
      </div>

    </section>
  )
}

export default HeroSection