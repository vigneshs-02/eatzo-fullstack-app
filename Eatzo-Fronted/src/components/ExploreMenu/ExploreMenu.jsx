import React, { useRef, useContext } from 'react'
import { myContext } from '../../App'
import { categories } from '../../data/data'
import { FaChevronLeft, FaChevronRight } 
  from 'react-icons/fa'
import './ExploreMenu.css'

const ExploreMenu = ({ selected, setSelected }) => {

  const scrollRef = useRef(null)

  // Scroll left
  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: 'smooth'
    })
  }

  // Scroll right
  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: 'smooth'
    })
  }

  return (
    <section className="explore-menu" id="menu">

      {/* Section Header */}
      <div className="explore-header">
        <p className="explore-tagline">
          ✦ What's on your mind?
        </p>
        <h2 className="explore-title">
          Explore Our Menu
        </h2>
        <div className="explore-divider">
          <span className="divider-line"></span>
          <span className="divider-diamond">◆</span>
          <span className="divider-line"></span>
        </div>
      </div>

      {/* Categories with Arrows */}
      <div className="categories-outer">

        {/* Left Arrow */}
        <button
          className="scroll-arrow scroll-left"
          onClick={scrollLeft}>
          <FaChevronLeft size={16} />
        </button>

        {/* Scrollable Categories */}
        <div
          className="categories-wrapper"
          ref={scrollRef}>
          <div className="categories-scroll">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className={`category-card 
                  ${selected === cat.name
                    ? 'category-active' : ''}`}
                onClick={() => 
                  setSelected(cat.name)}>

                {/* Image */}
                <div className="category-image-wrapper">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="category-image"
                    />
                  ) : (
                    <div className="category-emoji">
                      {cat.emoji}
                    </div>
                  )}
                  <div className="category-overlay">
                  </div>
                </div>

                {/* Name */}
                <p className="category-name">
                  {cat.name}
                </p>

                {/* Active dot */}
                {selected === cat.name && (
                  <div className="active-dot"></div>
                )}

              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          className="scroll-arrow scroll-right"
          onClick={scrollRight}>
          <FaChevronRight size={16} />
        </button>

      </div>

    </section>
  )
}

export default ExploreMenu