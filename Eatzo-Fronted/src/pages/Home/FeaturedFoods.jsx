import React, { useContext } from 'react'
import { myContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../data/data'
import { AiOutlinePlus, AiOutlineMinus }
  from 'react-icons/ai'
import './FeaturedFoods.css'

const FeaturedFoods = () => {

  const {
    foodList,
    cartItems,
    addToCart,
    removeFromCart,
    token,
    dispatch
  } = useContext(myContext)

  const navigate = useNavigate()

  // Show only first 4 foods
  const featuredFoods = foodList
  .filter(food => food.available !== false)
  .slice(0, 4)

  const handleAdd = (foodId) => {
    if (!token) {
      dispatch({
        type: "SHOW_LOGIN",
        payload: true
      })
      return
    }
    addToCart(foodId)
  }

  const handleRemove = (foodId) => {
    removeFromCart(foodId)
  }

  return (
    <section className="featured-section">

      {/* Header */}
      <div className="featured-header">
        <p className="featured-tagline">
          ✦ Handcrafted with passion
        </p>
        <h2 className="featured-title">
          Our Signature Dishes
        </h2>
        <div className="featured-divider">
          <span className="divider-line"></span>
          <span className="divider-diamond">
            ◆
          </span>
          <span className="divider-line"></span>
        </div>
      </div>

      {/* Food Grid */}
      {featuredFoods.length > 0 ? (
        <>
          <div className="featured-grid">
            {featuredFoods.map((food) => {

              const quantity =
                cartItems[food.id] || 0

              return (
                <div
                  key={food.id}
                  className="featured-card">

                  {/* Image */}
                  <div className="featured-image-wrapper">
                    <img
                      src={`${BASE_URL}/api/food/image/${food.imageUrl}`}
                      alt={food.name}
                      className="featured-image"
                    />

                    {/* Badge */}
                    <span className="featured-badge">
                      {food.category}
                    </span>

                    {/* Counter */}
                    <div className="featured-counter">
                      {quantity === 0 ? (
                        <button
                          className="featured-add-btn"
                          onClick={() =>
                            handleAdd(food.id)}>
                          + Add
                        </button>
                      ) : (
                        <div className="counter-controls">
                          <button
                            className="counter-btn"
                            onClick={() =>
                              handleRemove(food.id)}>
                            <AiOutlineMinus
                              size={12} />
                          </button>
                          <span className="counter-num">
                            {quantity}
                          </span>
                          <button
                            className="counter-btn"
                            onClick={() =>
                              handleAdd(food.id)}>
                            <AiOutlinePlus
                              size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="featured-body">

                    <div className="featured-name-row">
                      <h3 className="featured-name">
                        {food.name}
                      </h3>
                     <span className="featured-rating">
  ★ {(4 + Math.random()).toFixed(1)}
</span>
                    </div>

                    <p className="featured-desc">
                      {food.description}
                    </p>

                    <div className="featured-footer">
                      <p className="featured-price">
                        ₹{food.price}
                      </p>
                      {quantity > 0 && (
                        <p className="featured-in-cart">
                          {quantity} in cart
                        </p>
                      )}
                    </div>

                  </div>

                </div>
              )
            })}
          </div>

          {/* Explore Button */}
          <div className="featured-btn-wrapper">
            <button
              className="explore-menu-btn"
              onClick={() => navigate('/menu')}>
              Explore Full Menu
            </button>
            <p className="explore-hint">
              {foodList.length} dishes available
            </p>
          </div>
        </>
      ) : (
        <div className="featured-empty">
          <p className="empty-icon">🍽️</p>
          <p className="empty-text">
            Menu coming soon!
          </p>
          <button
            className="explore-menu-btn"
            onClick={() => navigate('/menu')}>
            View Menu
          </button>
        </div>
      )}

    </section>
  )
}

export default FeaturedFoods