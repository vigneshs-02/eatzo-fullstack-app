import React, { useState, useContext } from 'react'
import { myContext } from '../../App'
import { loginUser, registerUser } 
  from '../../services/api'
import { AiOutlineClose } from 'react-icons/ai'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { MdEmail, MdLock, MdPerson } 
  from 'react-icons/md'
import './LoginPopup.css'

const LoginPopup = () => {

  const { dispatch } = useContext(myContext)

  // ── State ──────────────────────────────
  const [currentView, setCurrentView] =
    useState("login")
  const [showPassword, setShowPassword] =
    useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  })

  // ── Close popup ────────────────────────
  const handleClose = () => {
    dispatch({
      type: "SHOW_LOGIN",
      payload: false
    })
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  // ── Input handlers ─────────────────────
  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
    setError("")
  }

  const handleSignupChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    })
    setError("")
  }

  // ── LOGIN Submit ───────────────────────
  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Call login API
      const response = await loginUser(loginData)
      const data = response.data

      // Check if login successful
      if (data.token) {

        // Save token + userId in localStorage
        localStorage.setItem('token', data.token)
        localStorage.setItem(
          'userId', data.userId)

        // Update global state
        dispatch({
          type: "SET_TOKEN",
          payload: {
            token: data.token,
            userId: data.userId
          }
        })

        // Close popup
        handleClose()

      } else {
        setError(data.message || 
          "Login failed!")
      }

    } catch (err) {
      // Handle errors
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError("Something went wrong!")
      }
    } finally {
      setLoading(false)
    }
  }

  // ── SIGNUP Submit ──────────────────────
  const handleSignupSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Call register API
      const response = await 
        registerUser(signupData)
      const data = response.data

      if (data.token) {

        // Save in localStorage
        localStorage.setItem('token', data.token)
        localStorage.setItem(
          'userId', data.userId)

        // Update global state
        dispatch({
          type: "SET_TOKEN",
          payload: {
            token: data.token,
            userId: data.userId
          }
        })

        // Close popup
        handleClose()

      } else {
        setError(data.message || 
          "Registration failed!")
      }

    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError("Something went wrong!")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="popup-overlay"
      onClick={handleOverlayClick}>

      <div className="popup-container">

        {/* Close */}
        <button
          className="popup-close"
          onClick={handleClose}>
          <AiOutlineClose size={20} />
        </button>

        {/* Header */}
        <div className="popup-header">
          <h1 className="popup-logo">EATZO</h1>
          <p className="popup-tagline">
            {currentView === "login"
              ? "Welcome back, food lover!"
              : "Join us for a royal experience!"}
          </p>
        </div>

        {/* Tabs */}
        <div className="popup-tabs">
          <button
            className={`popup-tab
              ${currentView === "login"
                ? "tab-active" : ""}`}
            onClick={() =>
              setCurrentView("login")}>
            Login
          </button>
          <button
            className={`popup-tab
              ${currentView === "signup"
                ? "tab-active" : ""}`}
            onClick={() =>
              setCurrentView("signup")}>
            Sign Up
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {/* ── LOGIN FORM ──────────────── */}
        {currentView === "login" && (
          <form
            className="popup-form"
            onSubmit={handleLoginSubmit}>

            {/* Email */}
            <div className="input-group">
              <MdEmail
                className="input-icon"
                size={18} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={loginData.email}
                onChange={handleLoginChange}
                className="popup-input"
                required
              />
            </div>

            {/* Password */}
            <div className="input-group">
              <MdLock
                className="input-icon"
                size={18} />
              <input
                type={showPassword
                  ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                className="popup-input"
                required
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowPassword(!showPassword)}>
                {showPassword
                  ? <FiEyeOff size={16} />
                  : <FiEye size={16} />}
              </button>
            </div>

            {/* Forgot */}
            <p className="forgot-password">
              Forgot password?
            </p>

            {/* Submit */}
            <button
              type="submit"
              className="popup-submit-btn"
              disabled={loading}>
              {loading
                ? "Logging in..."
                : "Login to Eatzo"}
            </button>

            {/* Switch */}
            <p className="popup-switch">
              New here?{" "}
              <span onClick={() =>
                setCurrentView("signup")}>
                Create an account
              </span>
            </p>

          </form>
        )}

        {/* ── SIGNUP FORM ─────────────── */}
        {currentView === "signup" && (
          <form
            className="popup-form"
            onSubmit={handleSignupSubmit}>

            {/* Name */}
            <div className="input-group">
              <MdPerson
                className="input-icon"
                size={18} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={signupData.name}
                onChange={handleSignupChange}
                className="popup-input"
                required
              />
            </div>

            {/* Email */}
            <div className="input-group">
              <MdEmail
                className="input-icon"
                size={18} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={signupData.email}
                onChange={handleSignupChange}
                className="popup-input"
                required
              />
            </div>

            {/* Password */}
            <div className="input-group">
              <MdLock
                className="input-icon"
                size={18} />
              <input
                type={showPassword
                  ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={signupData.password}
                onChange={handleSignupChange}
                className="popup-input"
                required
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowPassword(!showPassword)}>
                {showPassword
                  ? <FiEyeOff size={16} />
                  : <FiEye size={16} />}
              </button>
            </div>

            {/* Terms */}
            <p className="terms-text">
              By signing up you agree to our{" "}
              <span>Terms of Service</span>
              {" "}and{" "}
              <span>Privacy Policy</span>
            </p>

            {/* Submit */}
            <button
              type="submit"
              className="popup-submit-btn"
              disabled={loading}>
              {loading
                ? "Creating account..."
                : "Create Account"}
            </button>

            {/* Switch */}
            <p className="popup-switch">
              Already have an account?{" "}
              <span onClick={() =>
                setCurrentView("login")}>
                Login here
              </span>
            </p>

          </form>
        )}

      </div>
    </div>
  )
}

export default LoginPopup;