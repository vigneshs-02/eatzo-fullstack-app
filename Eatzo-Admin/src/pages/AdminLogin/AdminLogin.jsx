import React, { useState } from 'react'
import axios from 'axios'
import './AdminLogin.css'

const BASE_URL = "https://eatzo-fullstack-app-production.up.railway.app"

const AdminLogin = ({ setToken, setIsAdmin }) => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        formData
      )

      const data = response.data

      // ✅ Check if role is ADMIN
      if (data.token && 
          data.role === "ADMIN") {

        // Save token
        localStorage.setItem(
          'token', data.token)
        localStorage.setItem(
          'userId', data.userId)

        // Update parent state
        setToken(data.token)
        setIsAdmin(true)

      } else {
        // Not admin!
        setError(
          "Access denied! Admin only.")
      }

    } catch (error) {
      setError(
        error.response?.data?.message
        || "Login failed!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page">

      {/* Background */}
      <div className="admin-login-bg"></div>

      {/* Login Box */}
      <div className="admin-login-box">

        {/* Logo */}
        <div className="admin-login-header">
          <h1 className="admin-login-logo">
            EATZO
          </h1>
          <span className="admin-login-badge">
            Admin Panel
          </span>
          <p className="admin-login-subtitle">
            Sign in to manage your restaurant
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="admin-login-error">
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form
          className="admin-login-form"
          onSubmit={handleSubmit}>

          {/* Email */}
          <div className="admin-form-group">
            <label className="admin-form-label">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="admin@eatzo.com"
              value={formData.email}
              onChange={handleChange}
              className="admin-form-input"
              required
            />
          </div>

          {/* Password */}
          <div className="admin-form-group">
            <label className="admin-form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="admin-form-input"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}>
            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>

        </form>

      </div>

    </div>
  )
}

export default AdminLogin