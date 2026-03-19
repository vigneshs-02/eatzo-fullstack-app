import React, {
  useReducer,
  createContext,
  useEffect,
  useContext
} from 'react'
import {
  getAllFoods,
  addToCartAPI,
  removeFromCartAPI,
  deleteCartItemAPI 
} from './services/api'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import LoginPopup from 
  './components/LoginPopup/LoginPopup'
import Home from './pages/Home/Home'
import Menu from './pages/Menu/Menu'
import Cart from './pages/Cart/Cart'
import PlaceOrder from 
  './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'

// ── Reducer ────────────────────────────
function reducer(state, action) {
  switch(action.type) {

    case "SET_FOOD_LIST":
      return {
        ...state,
        foodList: action.payload,
        loading: false
      }

    case "ADD_TO_CART":
      const existing = 
        state.cartItems[action.payload]
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [action.payload]: existing
            ? existing + 1 : 1
        }
      }

    case "REMOVE_FROM_CART":
      const updated = { ...state.cartItems }
      if (updated[action.payload] > 1) {
        updated[action.payload] -= 1
      } else {
        delete updated[action.payload]
      }
      return { ...state, cartItems: updated }

    case "DELETE_FROM_CART":
      const newCart = { ...state.cartItems }
      delete newCart[action.payload]
      return { ...state, cartItems: newCart }

    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId
      }

    case "LOGOUT":
      return {
        ...state,
        token: "",
        userId: null,
        cartItems: {}
      }

    case "SHOW_LOGIN":
      return {
        ...state,
        showLogin: action.payload
      }

    case "SET_CART":
      return {
        ...state,
        cartItems: action.payload
      }
    case "CLEAR_CART":
        return {
    ...state,
    cartItems: {}
  }

    default:
      return state
  }
}

// ── Context ────────────────────────────
export let myContext = createContext()

// ── Layout ─────────────────────────────
const Layout = () => {
  const { showLogin } = useContext(myContext)
  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      minHeight: '100vh'
    }}>
      {showLogin && <LoginPopup />}
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

// ── Router ──────────────────────────────
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "menu", element: <Menu /> },
      { path: "cart", element: <Cart /> },
      { path: "order", element: <PlaceOrder /> },
      { path: "myorders", element: <MyOrders /> }
    ]
  }
])

// ── App ─────────────────────────────────
const App = () => {

  const [state, dispatch] = useReducer(
    reducer, {
    foodList: [],
    cartItems: {},
    token: localStorage.getItem("token") || "",
    userId: localStorage.getItem("userId")
      || null,
    showLogin: false,
    loading: true,
  })

  // ── Fetch foods on load ────────────────
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await getAllFoods()
        dispatch({
          type: "SET_FOOD_LIST",
          payload: response.data
        })
      } catch (error) {
        console.error(
          "Error fetching foods:", error)
      }
    }
    fetchFoods()
  }, [])

  // ── Add to cart function ───────────────
  const addToCart = async (foodId) => {
    // 1. Update UI instantly
    dispatch({
      type: "ADD_TO_CART",
      payload: foodId
    })

    // 2. If logged in → save to backend
    if (state.token && state.userId) {
      try {
        await addToCartAPI(
          state.userId, foodId)
      } catch (error) {
        console.error(
          "Error adding to cart:", error)
      }
    }
  }

  // ── Remove from cart function ──────────
  const removeFromCart = async (foodId) => {
    // 1. Update UI instantly
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: foodId
    })
    // 2. If logged in → update backend
    if (state.token && state.userId) {
      try {
        await removeFromCartAPI(
          state.userId, foodId)
      } catch (error) {
        console.error(
          "Error removing from cart:", error)
      }
    }
  }

  const deleteFromCart = async (foodId) => {
  dispatch({
    type: "DELETE_FROM_CART",
    payload: foodId
  })

  if (state.token && state.userId) {
    try {
      await deleteCartItemAPI(
        state.userId, foodId)  // ← use this
    } catch (error) {
      console.error(
        "Error deleting cart item:", error)
    }
  }
}


  return (
    <myContext.Provider value={{
      ...state,
      dispatch,
      addToCart,        
      removeFromCart,
      deleteFromCart 
    }}>
      <RouterProvider router={router} />
    </myContext.Provider>
  )
}

export default App