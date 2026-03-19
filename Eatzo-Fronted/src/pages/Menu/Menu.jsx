import React, { useState } from 'react'
import ExploreMenu from 
  '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from 
  '../../components/FoodDisplay/FoodDisplay'
import './Menu.css'

const Menu = () => {

  const [selectedCategory, setSelectedCategory]
    = useState("All")

  return (
    <div className="menu-page">

      <ExploreMenu
        selected={selectedCategory}
        setSelected={setSelectedCategory}
      />
      <FoodDisplay
        selectedCategory={selectedCategory}
      />
    </div>
  )
}

export default Menu