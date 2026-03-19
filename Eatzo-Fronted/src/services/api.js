import axios from 'axios'

// Base URL — Spring Boot backend
const BASE_URL = "https://eatzo-fullstack-app-production.up.railway.app"

// Create axios instance
// This adds token automatically
// to every request!
const api = axios.create({
  baseURL: BASE_URL,
})

// ── Interceptor ────────────────────────
// This runs BEFORE every request
// Automatically adds JWT token
// to Authorization header!
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = 
      `Bearer ${token}`
  }
  return config
})

// ── AUTH APIs ───────────────────────────

// Register new user
export const registerUser = (data) => {
  return api.post('/api/auth/register', data)
}

// Login user
export const loginUser = (data) => {
  return api.post('/api/auth/login', data)
}

// ── FOOD APIs ───────────────────────────

// Get all foods (public — no token needed)
export const getAllFoods = () => {
  return axios.get(`${BASE_URL}/api/food/list`)
}

// Add new food (admin only)
export const addFood = (formData) => {
  return api.post('/api/food/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// Delete food (admin only)
export const deleteFood = (id) => {
  return api.delete(`/api/food/delete/${id}`)
}

// ── CART APIs ───────────────────────────

// Add to cart
export const addToCartAPI = (userId, foodId) => {
  return api.post('/api/cart/add', null, {
    params: {
      userId: userId,
      foodId: foodId,
      quantity: 1
    }
  })
}

// Remove from cart
export const removeFromCartAPI = (
  userId, foodId) => {
  return api.post('/api/cart/remove', null, {
    params: {
      userId: userId,
      foodId: foodId
    }
  })
}

export const deleteCartItemAPI = (
  userId, foodId) => {
  return api.delete('/api/cart/delete', {
    params: {
      userId: userId,
      foodId: foodId
    }
  })
}

// Get cart
export const getCartAPI = (userId) => {
  return api.get(`/api/cart/get/${userId}`)
}

// ── ORDER APIs ──────────────────────────

// Place order
export const placeOrderAPI = (
  userId, addressData) => {
  return api.post('/api/order/place', null, {
    params: {
      userId: userId,
      street: addressData.street,
      city: addressData.city,
      state: addressData.state,
      pincode: addressData.pincode
    }
  })
}

// Get user orders
export const getUserOrdersAPI = (userId) => {
  return api.get(
    `/api/order/userorders/${userId}`)
}

// Get all orders (admin)
export const getAllOrdersAPI = () => {
  return api.get('/api/order/list')
}

// Update order status (admin)
export const updateOrderStatusAPI = (
  orderId, status) => {
  return api.post('/api/order/status', null, {
    params: {
      orderId: orderId,
      status: status
    }
  })
}

export default api