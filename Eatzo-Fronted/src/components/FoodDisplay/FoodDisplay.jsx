import React, { useContext, useEffect } 
  from 'react'
import { myContext } from '../../App'
import FoodItem from '../FoodItem/FoodItem'
import axios from 'axios'
import { BASE_URL } from '../../data/data'
import './FoodDisplay.css'

const FoodDisplay = ({ selectedCategory }) => {

  const { foodList, dispatch } = 
    useContext(myContext)

  // Fetch food list from backend
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/food/list`)
        dispatch({
          type: "SET_FOOD_LIST",
          payload: response.data
        })
      } catch (error) {
        console.error("Error fetching foods:", error)
      }
    }
    fetchFoods()
  }, [])
  
const filteredFoods = selectedCategory === "All"
  ? foodList.filter(food => food.available)
  : foodList.filter(food =>
      food.category === selectedCategory
      && food.available)

  return (
    <section className="food-display" id="foods">

      {/* Food Grid */}
      {filteredFoods.length > 0 ? (
        <div className="food-grid">
          {filteredFoods.map((food) => (
            <FoodItem
              key={food.id}
              food={food}
            />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="food-empty">
          <p className="empty-icon">🍽️</p>
          <p className="empty-text">
            No dishes found in this category
          </p>
          <p className="empty-sub">
            Try selecting a different category
          </p>
        </div>
      )}

    </section>
  )
}

export default FoodDisplay