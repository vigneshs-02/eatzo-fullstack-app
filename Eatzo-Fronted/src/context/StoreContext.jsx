import { createContext, useContext, 
         useState, useEffect } from "react"
import axios from "axios"

// 1. Create Context
export const StoreContext = createContext(null)

// 2. Custom hook to use context easily
export const useStore = () => useContext(StoreContext)

// 3. Base URL for all API calls
const BASE_URL = "http://localhost:8080"

// 4. Provider Component
const StoreContextProvider = ({ children }) => {

  // ─── STATE ───────────────────────────────────

  // Food list from backend
  const [foodList, setFoodList] = useState([])

  // Cart items → { foodId: quantity }
  const [cartItems, setCartItems] = useState({})

  // JWT token
  const [token, setToken] = useState("")

  // Logged in user id
  const [userId, setUserId] = useState(null)

  // Login popup show/hide
  const [showLogin, setShowLogin] = useState(false)

  // Loading state
  const [loading, setLoading] = useState(false)

  // ─── FOOD FUNCTIONS ──────────────────────────

  // Fetch all foods from backend
  const fetchFoodList = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `${BASE_URL}/api/food/list`)
      setFoodList(response.data)
    } catch (error) {
      console.error("Error fetching foods:", error)
    } finally {
      setLoading(false)
    }
  }

  // ─── CART FUNCTIONS ──────────────────────────

  // Add item to cart
  const addToCart = async (foodId) => {

    // Update local state first (instant UI update)
    setCartItems((prev) => ({
      ...prev,
      [foodId]: prev[foodId] ? prev[foodId] + 1 : 1
    }))

    // If logged in → update backend too
    if (token && userId) {
      try {
        await axios.post(
          `${BASE_URL}/api/cart/add`,
          null,
          {
            params: {
              userId: userId,
              foodId: foodId,
              quantity: 1
            },
            headers: { Authorization: `Bearer ${token}` }
          }
        )
      } catch (error) {
        console.error("Error adding to cart:", error)
      }
    }
  }

  // Remove item from cart
  const removeFromCart = async (foodId) => {

    // Update local state first
    setCartItems((prev) => {
      const updated = { ...prev }
      if (updated[foodId] > 1) {
        updated[foodId] -= 1
      } else {
        delete updated[foodId]
      }
      return updated
    })

    // If logged in → update backend too
    if (token && userId) {
      try {
        await axios.post(
          `${BASE_URL}/api/cart/remove`,
          null,
          {
            params: {
              userId: userId,
              foodId: foodId
            },
            headers: { Authorization: `Bearer ${token}` }
          }
        )
      } catch (error) {
        console.error("Error removing from cart:", error)
      }
    }
  }

  // Get total cart item count
  const getCartCount = () => {
    return Object.values(cartItems)
      .reduce((total, qty) => total + qty, 0)
  }

  // Get total cart amount
  const getCartAmount = () => {
    let total = 0
    foodList.forEach((food) => {
      if (cartItems[food.id]) {
        total += food.price * cartItems[food.id]
      }
    })
    return total
  }

  // ─── AUTH FUNCTIONS ──────────────────────────

  // Logout
  const logout = () => {
    setToken("")
    setUserId(null)
    setCartItems({})
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
  }

  // ─── LOAD FROM LOCALSTORAGE ──────────────────

  // When app loads → check if token exists
  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    const savedUserId = localStorage.getItem("userId")

    if (savedToken) {
      setToken(savedToken)
    }
    if (savedUserId) {
      setUserId(Number(savedUserId))
    }

    // Always fetch food list on load
    fetchFoodList()
  }, [])

  // ─── CONTEXT VALUE ───────────────────────────

  const contextValue = {
    // Data
    foodList,
    cartItems,
    token,
    setToken,
    userId,
    setUserId,
    showLogin,
    setShowLogin,
    loading,
    BASE_URL,

    // Functions
    addToCart,
    removeFromCart,
    getCartCount,
    getCartAmount,
    fetchFoodList,
    logout,
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider