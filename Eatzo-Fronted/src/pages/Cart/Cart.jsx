import React, { useContext } from 'react'
import { myContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import { AiOutlinePlus, AiOutlineMinus } 
  from 'react-icons/ai'
import { BsCart3 } from 'react-icons/bs'
import { BASE_URL, DELIVERY_FEE } 
  from '../../data/data'
import './Cart.css'

const Cart = () => {

  const { cartItems, foodList, dispatch, deleteFromCart  } = 
    useContext(myContext)

  const navigate = useNavigate()

  // Get cart food items with details
  const cartFoods = foodList.filter(
    food => cartItems[food.id] > 0)

  // Calculate subtotal
  const subtotal = cartFoods.reduce(
    (total, food) => 
      total + food.price * cartItems[food.id], 0)

  // Total with delivery
  const total = subtotal + 
    (subtotal > 0 ? DELIVERY_FEE : 0)

  // Add item
  const handleAdd = (foodId) => {
    dispatch({ 
      type: "ADD_TO_CART", 
      payload: foodId 
    })
  }

  // Remove item
  const handleRemove = (foodId) => {
    dispatch({ 
      type: "REMOVE_FROM_CART", 
      payload: foodId 
    })
  }

  // Delete item completely
  const handleDelete = (foodId) => {
  deleteFromCart(foodId)  
}

  return (
    <div className="cart-page">

      {/* Page Header */}
      <div className="cart-header">
        <p className="cart-tagline">
          ✦ Your Selection
        </p>
        <h1 className="cart-title">
          Your Cart
        </h1>
        <div className="cart-divider">
          <span className="divider-line"></span>
          <span className="divider-diamond">
            ◆
          </span>
          <span className="divider-line"></span>
        </div>
      </div>

      {/* Cart Content */}
      {cartFoods.length > 0 ? (
        <div className="cart-content">

          {/* LEFT — Cart Items */}
          <div className="cart-items-section">

            {/* Table Header */}
            <div className="cart-table-header">
              <span>Item</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
              <span></span>
            </div>

            {/* Cart Items List */}
            <div className="cart-items-list">
              {cartFoods.map((food) => (
                <div 
                  key={food.id} 
                  className="cart-item">

                  {/* Food Image + Name */}
                  <div className="cart-item-info">
                    <img
                      src={`${BASE_URL}/api/food/image/${food.imageUrl}`}
                      alt={food.name}
                      className="cart-item-image"
                    />
                    <div className="cart-item-details">
                      <h3 className="cart-item-name">
                        {food.name}
                      </h3>
                      <p className="cart-item-category">
                        {food.category}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <p className="cart-item-price">
                    ₹{food.price}
                  </p>

                  {/* Quantity Controls */}
                  <div className="cart-qty-controls">
                    <button
                      className="qty-btn"
                      onClick={() => 
                        handleRemove(food.id)}>
                      <AiOutlineMinus size={14} />
                    </button>
                    <span className="qty-number">
                      {cartItems[food.id]}
                    </span>
                    <button
                      className="qty-btn"
                      onClick={() => 
                        handleAdd(food.id)}>
                      <AiOutlinePlus size={14} />
                    </button>
                  </div>

                  {/* Item Total */}
                  <p className="cart-item-total">
                    ₹{food.price * cartItems[food.id]}
                  </p>

                  {/* Delete */}
                  <button
                    className="cart-delete-btn"
                    onClick={() => 
                      handleDelete(food.id)}>
                    <MdDelete size={18} />
                  </button>

                </div>
              ))}
            </div>

          </div>

          {/* RIGHT — Order Summary */}
          <div className="cart-summary">

            <h2 className="summary-title">
              Order Summary
            </h2>

            {/* Summary Details */}
            <div className="summary-details">

              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>₹{DELIVERY_FEE}</span>
              </div>

              <div className="summary-divider">
              </div>

              <div className="summary-row 
                              summary-total">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

            </div>

            {/* Promo Code */}
            <div className="promo-section">
              <p className="promo-label">
                Promo Code
              </p>
              <div className="promo-input-group">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="promo-input"
                />
                <button className="promo-btn">
                  Apply
                </button>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              className="checkout-btn"
              onClick={() => navigate('/order')}>
              Proceed to Checkout
            </button>

            {/* Continue Shopping */}
            <button
              className="continue-btn"
              onClick={() => navigate('/')}>
              ← Continue Shopping
            </button>

          </div>

        </div>
      ) : (

        /* Empty Cart */
        <div className="cart-empty">
          <BsCart3 
            size={80} 
            className="empty-cart-icon" />
          <h2 className="empty-cart-title">
            Your cart is empty
          </h2>
          <p className="empty-cart-sub">
            Looks like you haven't added 
            anything yet!
          </p>
          <button
            className="empty-cart-btn"
            onClick={() => navigate('/')}>
            Explore Menu
          </button>
        </div>

      )}

    </div>
  )
}

export default Cart