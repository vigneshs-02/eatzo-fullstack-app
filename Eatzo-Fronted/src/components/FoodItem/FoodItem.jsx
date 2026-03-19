import React, { useContext } from 'react'
import { myContext } from '../../App'
import { BASE_URL } from '../../data/data'
import './FoodItem.css'

const FoodItem = ({ food }) => {

  const {
    cartItems,
    addToCart,
    removeFromCart,
    token,
    dispatch
  } = useContext(myContext)

  // Get quantity of this item in cart
  const quantity = cartItems[food.id] || 0

  const handleAdd = () => {
    // If not logged in → show login popup
    if (!token) {
      dispatch({
        type: "SHOW_LOGIN",
        payload: true
      })
      return
    }
    addToCart(food.id)
  }

  const handleRemove = () => {
    removeFromCart(food.id)
  }

  return (
    <div className="food-item">

      {/* Image Container */}
      <div className="food-image-container">
        <img
          src={`${BASE_URL}/api/food/image/${food.imageUrl}`}
          alt={food.name}
          className="food-image"
        />

        {/* Category Badge */}
        <span className="food-category-badge">
          {food.category}
        </span>

        {/* Add/Remove buttons */}
        <div className="food-counter">
          {quantity === 0 ? (
            <button
              className="add-btn"
              onClick={handleAdd}>
              + Add
            </button>
          ) : (
            <div className="counter-controls">
              <button
                className="counter-btn"
                onClick={handleRemove}>
                −
              </button>
              <span className="counter-number">
                {quantity}
              </span>
              <button
                className="counter-btn"
                onClick={handleAdd}>
                +
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="food-body">

        <div className="food-header">
          <h3 className="food-name">
            {food.name}
          </h3>
         <span className="food-rating">
  ★ {(4 + Math.random()).toFixed(1)}
</span>
        </div>

        <p className="food-description">
          {food.description}
        </p>

        <div className="food-divider"></div>

        <div className="food-footer">
          <p className="food-price">
            ₹{food.price}
          </p>
          {quantity > 0 && (
            <p className="food-in-cart">
              {quantity} in cart
            </p>
          )}
        </div>

      </div>

    </div>
  )
}

export default FoodItem