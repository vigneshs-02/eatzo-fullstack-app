import React, { useState, useEffect } from 'react'
import { getAllFoodsAPI, deleteFoodAPI } 
  from '../../services/api'
import { BASE_URL } from '../../data/menuData'
import { MdDelete } from 'react-icons/md'
import './FoodList.css'

const FoodList = () => {

  

   const [foods, setFoods] = useState([])
const [loading, setLoading] = useState(false)

// ✅ Fetch foods from backend
useEffect(() => {
  const fetchFoods = async () => {
    setLoading(true)
    try {
      const response = await getAllFoodsAPI()
      setFoods(response.data)
    } catch (error) {
      console.error(
        "Error fetching foods:", error)
    } finally {
      setLoading(false)
    }
  }
  fetchFoods()
}, [])

const handleDelete = async (id) => {
  try {
    await deleteFoodAPI(id)

    // ✅ Remove from UI immediately
    setFoods(foods.filter(
      food => food.id !== id))

    alert("Food removed successfully!")
  } catch (error) {
    console.error("Error:", error)
    alert("Failed to remove food!")
  }
}
  return (
    <div className="food-list-page">

      {/* Header */}
      <div className="page-header">
        <div>
          <p className="page-tagline">
            ✦ Restaurant Management
          </p>
          <h1 className="page-title">
            Food List
          </h1>
        </div>
        <div className="header-right">
          <p className="total-count">
            Total: {foods.length} items
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="food-table-wrapper">

        {/* Table Header */}
        <div className="food-table-header">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {/* Table Rows */}
        <div className="food-table-body">
          {foods.length > 0 ? (
            foods.map((food) => (
              <div
                key={food.id}
                className="food-table-row">

                {/* Image */}
                <div className="food-img-cell">
                  <img
                    src={`${BASE_URL}/api/food/image/${food.imageUrl}`}
                    alt={food.name}
                    className="food-list-img"
                    onError={(e) => {
  e.target.style.display = 'none'
}}
                  />
                </div>

                {/* Name */}
                <p className="food-list-name">
                  {food.name}
                </p>

                {/* Category */}
                <span className="food-list-category">
                  {food.category}
                </span>

                {/* Price */}
                <p className="food-list-price">
                  ₹{food.price}
                </p>

                {/* Status */}
                <span className={`food-status 
                  ${food.available
                    ? 'status-available'
                    : 'status-unavailable'}`}>
                  {food.available
                    ? 'Available'
                    : 'Unavailable'}
                </span>

                {/* Delete */}
                <button
                  className="food-delete-btn"
                  onClick={() => 
                    handleDelete(food.id)}>
                  <MdDelete size={18} />
                  Delete
                </button>

              </div>
            ))
          ) : (
            <div className="food-list-empty">
              <p className="empty-icon">🍽️</p>
              <p className="empty-text">
                No food items found!
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  )
}

export default FoodList