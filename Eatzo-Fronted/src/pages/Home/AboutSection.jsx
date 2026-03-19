import React from 'react'
import './AboutSection.css'

// Chef data
const chefs = [
  {
    id: 1,
    name: "Chef Arjun Sharma",
    role: "Head Chef",
    experience: "15 years experience",
    specialty: "Indian Cuisine",
    emoji: "👨‍🍳"
  },
  {
    id: 2,
    name: "Chef Priya Nair",
    role: "Pastry Chef",
    experience: "10 years experience",
    specialty: "Desserts & Bakery",
    emoji: "👩‍🍳"
  },
  {
    id: 3,
    name: "Chef Marco Silva",
    role: "Continental Chef",
    experience: "12 years experience",
    specialty: "Italian & French",
    emoji: "👨‍🍳"
  },
]

// Why choose us data
const whyUs = [
  {
    icon: "🌿",
    title: "Fresh Ingredients",
    description: 
      "We source only the finest and freshest ingredients from local farms every day."
  },
  {
    icon: "👨‍🍳",
    title: "Expert Chefs",
    description: 
      "Our team of world-class chefs bring decades of culinary expertise to every dish."
  },
  {
    icon: "🚀",
    title: "Fast Delivery",
    description: 
      "Hot and fresh food delivered to your doorstep within 30-45 minutes guaranteed."
  },
  {
    icon: "⭐",
    title: "Premium Quality",
    description: 
      "Every dish is crafted with passion and plated to perfection for your experience."
  },
]

const AboutSection = () => {
  return (
    <section className="about-section" id="about">

      {/* ── OUR STORY ──────────────────── */}
      <div className="story-container">

        <div className="story-left">
          <p className="about-tagline">
            ✦ Who We Are
          </p>
          <h2 className="about-title">
            Our Story
          </h2>
          <div className="about-divider">
            <span className="divider-line"></span>
            <span className="divider-diamond">
              ◆
            </span>
            <span className="divider-line"></span>
          </div>
          <p className="story-text">
            Born from a passion for exceptional
            food and warm hospitality, Eatzo was
            founded in 2020 with a simple vision —
            to bring restaurant-quality dining
            experience to every home.
          </p>
          <p className="story-text">
            What started as a small kitchen with
            big dreams has grown into a beloved
            culinary destination, serving thousands
            of food lovers across the city every day.
          </p>

          {/* Story Stats */}
          <div className="story-stats">
            <div className="story-stat">
              <h3>4+</h3>
              <p>Years of Excellence</p>
            </div>
            <div className="story-stat-divider">
            </div>
            <div className="story-stat">
              <h3>50K+</h3>
              <p>Orders Delivered</p>
            </div>
            <div className="story-stat-divider">
            </div>
            <div className="story-stat">
              <h3>98%</h3>
              <p>Happy Customers</p>
            </div>
          </div>
        </div>

        {/* Right — Decorative */}
        <div className="story-right">
          <div className="story-image-grid">

            <div className="story-card 
                            story-card-gold">
              <span className="story-card-icon">
                🍽️
              </span>
              <p className="story-card-title">
                Fine Dining
              </p>
              <p className="story-card-sub">
                Experience
              </p>
            </div>

            <div className="story-card 
                            story-card-dark">
              <span className="story-card-icon">
                ⭐
              </span>
              <p className="story-card-title">
                5 Star
              </p>
              <p className="story-card-sub">
                Rated Service
              </p>
            </div>

            <div className="story-card 
                            story-card-dark">
              <span className="story-card-icon">
                🌿
              </span>
              <p className="story-card-title">
                100% Fresh
              </p>
              <p className="story-card-sub">
                Ingredients
              </p>
            </div>

            <div className="story-card 
                            story-card-gold">
              <span className="story-card-icon">
                🚀
              </span>
              <p className="story-card-title">
                Fast
              </p>
              <p className="story-card-sub">
                Delivery
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* ── WHY CHOOSE US ──────────────── */}
      <div className="why-us-container">

        <div className="why-us-header">
          <p className="about-tagline">
            ✦ Our Promise
          </p>
          <h2 className="about-title">
            Why Choose Us
          </h2>
          <div className="about-divider 
                           center-divider">
            <span className="divider-line">
            </span>
            <span className="divider-diamond">
              ◆
            </span>
            <span className="divider-line">
            </span>
          </div>
        </div>

        <div className="why-us-grid">
          {whyUs.map((item, index) => (
            <div
              key={index}
              className="why-us-card">
              <span className="why-us-icon">
                {item.icon}
              </span>
              <h3 className="why-us-title">
                {item.title}
              </h3>
              <p className="why-us-desc">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>

    </section>
  )
}

export default AboutSection