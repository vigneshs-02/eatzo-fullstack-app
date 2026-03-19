import axios from 'axios'

const BASE_URL = "https://eatzo-backend-production.up.railway.app"

// Create axios instance with token
const api = axios.create({
  baseURL: BASE_URL,
})

// Auto add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  console.log("Sending token:", token) // ← add this
  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`
  }
  return config
})

// ── FOOD APIs ───────────────────────────

// Add new food
export const addFoodAPI = (formData) => {
  return api.post('/api/food/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// Get all foods
export const getAllFoodsAPI = () => {
  return axios.get(`${BASE_URL}/api/food/list`)
}

// Delete food
export const deleteFoodAPI = (id) => {
  return api.delete(`/api/food/delete/${id}`)
}

// ── ORDER APIs ──────────────────────────

// Get all orders
export const getAllOrdersAPI = () => {
  return api.get('/api/order/list')
}

// Update order status
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