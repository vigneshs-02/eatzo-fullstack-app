// ── Category Images ─────────────────────
import pizzaImg from 
  '../assets/categories/pizzaImg.jpg'
import burgerImg from 
  '../assets/categories/burgerImg.jpg'
import drinksImg from 
  '../assets/categories/drinksImg.jpg'
import pastaImg from 
  '../assets/categories/pastaImg.jpg'
import soupImg from 
  '../assets/categories/soup.jpg'
import friedRiceImg from 
  '../assets/categories/fried_rice.jpg'
import iceCreamImg from 
  '../assets/categories/ice_cream.jpg'


// ── Categories Data ──────────────────────
export const categories = [
  { name: "All",      image: null,        emoji: "🍽️" },
  { name: "Pizza",    image: pizzaImg,    emoji: "🍕" },
  { name: "Burger",   image: burgerImg,   emoji: "🍔" },
  { name: "Drinks",   image: drinksImg,   emoji: "🥤" },
  { name: "Pasta",    image: pastaImg,    emoji: "🍝" },
  { 
    name: "Soup", 
    image: soupImg, 
    emoji: "🍜" 
  },
  { 
    name: "Fried Rice", 
    image: friedRiceImg, 
    emoji: "🍚" 
  },
  { 
    name: "Ice Cream", 
    image: iceCreamImg, 
    emoji: "🍦" 
  },
]

export const BASE_URL = "http://localhost:8080"
export const DELIVERY_FEE = 40