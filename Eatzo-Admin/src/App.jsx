import React, { useState, useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import AddFood from './pages/AddFood/AddFood'
import FoodList from './pages/FoodList/FoodList'
import Orders from './pages/Orders/Orders'
import AdminLogin from './pages/AdminLogin/AdminLogin';
import './App.css'

// Layout
const Layout = () => {
  return (
    <div className="admin-layout">
      <Navbar />
      <div className="admin-body">
        <Sidebar />
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <AddFood /> },
      { path: "add", element: <AddFood /> },
      { path: "list", element: <FoodList /> },
      { path: "orders", element: <Orders /> },
    ]
  }
])

const App = () => {

  const [isAdmin, setIsAdmin] = useState(false)
  const [token, setToken] = useState("")
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Check token on every load
    const savedToken = 
      localStorage.getItem('token')

    if (savedToken) {
      try {
        // Decode token
        const payload = JSON.parse(
          atob(savedToken.split('.')[1]))

        // Check expiry
        const isExpired = 
          payload.exp * 1000 < Date.now()

        if (!isExpired && 
            payload.role === 'ADMIN') {
          setToken(savedToken)
          setIsAdmin(true)
        } else {
          // Token expired or not admin
          localStorage.removeItem('token')
          localStorage.removeItem('userId')
          setIsAdmin(false)
        }
      } catch (error) {
        localStorage.removeItem('token')
        setIsAdmin(false)
      }
    } else {
      setIsAdmin(false)
    }
    setChecking(false)
  }, [])

  // ✅ Add logout function
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    setToken("")
    setIsAdmin(false)
  }

  // Loading state
  if (checking) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#d4a843',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '14px',
        letterSpacing: '2px'
      }}>
        Loading...
      </div>
    )
  }

  // ✅ Not admin → show login page
  if (!isAdmin) {
    return (
      <AdminLogin
        setToken={setToken}
        setIsAdmin={setIsAdmin}
      />
    )
  }

  // ✅ Admin → show panel with logout
  return (
    <RouterProvider router={router} />
  )
}

export default App