import React, { useState, useContext } from 'react'
import { myContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import { BASE_URL, DELIVERY_FEE } 
  from '../../data/data'
import { MdPerson, MdPhone, MdEmail, 
         MdLocationOn, MdLocationCity,
         MdMap, MdMarkunread } 
  from 'react-icons/md'
import './PlaceOrder.css'
import { placeOrderAPI } from '../../services/api'

const PlaceOrder = () => {

  const { cartItems, foodList, token, userId, dispatch } 
    = useContext(myContext)

  const navigate = useNavigate()

  // ── Form State ─────────────────────────
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  })

  // ── Cart Calculation ───────────────────
  const cartFoods = foodList.filter(
    food => cartItems[food.id] > 0)

  const subtotal = cartFoods.reduce(
    (total, food) =>
      total + food.price * cartItems[food.id], 0)

  const total = subtotal + 
    (subtotal > 0 ? DELIVERY_FEE : 0)

  // ── Handlers ───────────────────────────
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  // Check if logged in
  if (!token) {
    dispatch({
      type: "SHOW_LOGIN",
      payload: true
    })
    return
  }

  // Check cart not empty
  if (cartFoods.length === 0) {
    alert("Your cart is empty!")
    return
  }

  try {
    const response = await placeOrderAPI(
      userId,
      {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode
      }
    )

    if (response.data) {
      // Clear cart after order placed
      dispatch({ type: "CLEAR_CART" })

      // Go to my orders page
      navigate('/myorders')
    }

  } catch (error) {
    console.error("Error placing order:", error)
    alert("Failed to place order!")
  }
}

  return (
    <div className="place-order-page">

      {/* Page Header */}
      <div className="place-order-header">
        <p className="place-order-tagline">
          ✦ Almost There!
        </p>
        <h1 className="place-order-title">
          Delivery Details
        </h1>
        <div className="place-order-divider">
          <span className="divider-line"></span>
          <span className="divider-diamond">◆</span>
          <span className="divider-line"></span>
        </div>
      </div>

      {/* Content */}
      <div className="place-order-content">

        {/* LEFT — Delivery Form */}
        <div className="delivery-form-section">

          <h2 className="form-section-title">
            Delivery Information
          </h2>

          <form
            className="delivery-form"
            onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">
                Full Name
              </label>
              <div className="form-input-group">
                <MdPerson
                  className="form-icon"
                  size={18} />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Phone + Email — 2 columns */}
            <div className="form-row">

              {/* Phone */}
              <div className="form-group">
                <label className="form-label">
                  Phone Number
                </label>
                <div className="form-input-group">
                  <MdPhone
                    className="form-icon"
                    size={18} />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label">
                  Email Address
                </label>
                <div className="form-input-group">
                  <MdEmail
                    className="form-icon"
                    size={18} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

            </div>

            {/* Street */}
            <div className="form-group">
              <label className="form-label">
                Street Address
              </label>
              <div className="form-input-group">
                <MdLocationOn
                  className="form-icon"
                  size={18} />
                <input
                  type="text"
                  name="street"
                  placeholder="House no, Street name"
                  value={formData.street}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* City + State — 2 columns */}
            <div className="form-row">

              {/* City */}
              <div className="form-group">
                <label className="form-label">
                  City
                </label>
                <div className="form-input-group">
                  <MdLocationCity
                    className="form-icon"
                    size={18} />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              {/* State */}
              <div className="form-group">
                <label className="form-label">
                  State
                </label>
                <div className="form-input-group">
                  <MdMap
                    className="form-icon"
                    size={18} />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

            </div>

            {/* Pincode */}
            <div className="form-group">
              <label className="form-label">
                Pincode
              </label>
              <div className="form-input-group">
                <MdMarkunread
                  className="form-icon"
                  size={18} />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Enter pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="place-order-btn">
              Place Order
            </button>

          </form>

        </div>

        {/* RIGHT — Order Summary */}
        <div className="order-summary-section">

          <h2 className="summary-section-title">
            Order Summary
          </h2>

          {/* Items List */}
          <div className="summary-items">
            {cartFoods.map((food) => (
              <div
                key={food.id}
                className="summary-item">

                <div className="summary-item-left">
                  <img
                    src={`${BASE_URL}/api/food/image/${food.imageUrl}`}
                    alt={food.name}
                    className="summary-item-image"
                  />
                  <div>
                    <p className="summary-item-name">
                      {food.name}
                    </p>
                    <p className="summary-item-qty">
                      Qty: {cartItems[food.id]}
                    </p>
                  </div>
                </div>

                <p className="summary-item-price">
                  ₹{food.price * cartItems[food.id]}
                </p>

              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="summary-line"></div>

          {/* Price Breakdown */}
          <div className="summary-breakdown">

            <div className="breakdown-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="breakdown-row">
              <span>Delivery Fee</span>
              <span>₹{DELIVERY_FEE}</span>
            </div>

            <div className="summary-line"></div>

            <div className="breakdown-row 
                            breakdown-total">
              <span>Total Amount</span>
              <span>₹{total}</span>
            </div>

          </div>

          {/* Payment Method */}
          <div className="payment-section">
            <p className="payment-label">
              ✦ Payment Method
            </p>
            <div className="payment-option">
              <span className="payment-dot"></span>
              <span className="payment-text">
                Cash on Delivery (COD)
              </span>
            </div>
          </div>

          {/* Delivery Note */}
          <div className="delivery-note">
            <p className="note-text">
              🕐 Estimated delivery time: 
              <span> 30-45 minutes</span>
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default PlaceOrder