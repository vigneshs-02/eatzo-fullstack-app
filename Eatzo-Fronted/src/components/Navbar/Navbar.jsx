import React, {
  useState,
  useEffect,
  useContext
} from 'react'
import {
  Link,
  useNavigate,
  useLocation
} from 'react-router-dom'
import { myContext } from '../../App'
import { FaShoppingCart } from 'react-icons/fa'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import './Navbar.css'

const Navbar = () => {

  const { cartItems, token, dispatch } =
    useContext(myContext)

  const [profileOpen, setProfileOpen] = 
  useState(false)


  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  // Cart count
  const cartCount = Object.values(cartItems)
    .reduce((total, qty) => total + qty, 0)

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () =>
      window.removeEventListener(
        'scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  // ── Smart scroll navigation ────────────
  const handleNavClick = (sectionId) => {
    closeMenu()
    if (location.pathname === '/') {
      const section =
        document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({
          behavior: 'smooth'
        })
      }
    } else {
      navigate('/')
      setTimeout(() => {
        const section =
          document.getElementById(sectionId)
        if (section) {
          section.scrollIntoView({
            behavior: 'smooth'
          })
        }
      }, 300)
    }
  }

  // ── Auth handlers ──────────────────────
  const handleLogin = () => {
    dispatch({
      type: "SHOW_LOGIN",
      payload: true
    })
    closeMenu()
  }

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    closeMenu()
  }

  return (
    <nav className={`navbar ${scrolled
      ? 'navbar-scrolled'
      : 'navbar-transparent'}`}>

      <div className="navbar-container">

        {/* Logo */}
        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}>
          EATZO
        </Link>

        {/* Desktop Links */}
        <ul className="navbar-links">

          {/* Home */}
          <li>
            <Link
              to="/"
              className="nav-link"
              onClick={() => 
                handleNavClick('home')}>
              Home
            </Link>
          </li>

          {/* Menu */}
          <li>
            <Link
              to="/menu"
              className="nav-link"
              onClick={closeMenu}>
              Menu
            </Link>
          </li>

          {/* About */}
          <li>
            <Link
              to="/"
              className="nav-link"
              onClick={() => 
                handleNavClick('about')}>
              About
            </Link>
          </li>

          {/* Contact */}
          <li>
            <Link
              to="/"
              className="nav-link"
              onClick={() => 
                handleNavClick('contact')}>
              Contact
            </Link>
          </li>

        </ul>

        {/* Right Side */}
        <div className="navbar-right">

          {/* Cart */}
          <Link
            to="/cart"
            className="cart-icon"
            onClick={closeMenu}>
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Login/Logout */}
           {token ? (
  <div className="profile-dropdown">
    <button
      className="profile-circle-btn"
      onClick={() =>
        setProfileOpen(!profileOpen)}>
      👤
    </button>

    {profileOpen && (
      <div className="dropdown-menu">
        <Link
          to="/myorders"
          className="dropdown-item"
          onClick={() => {
            setProfileOpen(false)
            closeMenu()
          }}>
          📦 My Orders
        </Link>
        <button
          className="dropdown-item"
          onClick={() => {
            handleLogout()
            setProfileOpen(false)
          }}>
          🚪 Logout
        </button>
      </div>
    )}
  </div>
) : (
  <button
    className="nav-btn"
    onClick={handleLogin}>
    Login
  </button>
)}

        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen
            ? <HiX size={26} />
            : <HiMenuAlt3 size={26} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">

          {/* Home */}
          <Link
            to="/"
            className="mobile-link"
            onClick={() => 
              handleNavClick('home')}>
            Home
          </Link>

          {/* Menu */}
          <Link
            to="/menu"
            className="mobile-link"
            onClick={closeMenu}>
            Menu
          </Link>

          {/* About */}
          <Link
            to="/"
            className="mobile-link"
            onClick={() => 
              handleNavClick('about')}>
            About
          </Link>

          {/* Contact */}
          <Link
            to="/"
            className="mobile-link"
            onClick={() => 
              handleNavClick('contact')}>
            Contact
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="mobile-link"
            onClick={closeMenu}>
            Cart ({cartCount})
          </Link>

          {/* Login/Logout */}
          {token ? (
            <button
              className="mobile-btn"
              onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button
              className="mobile-btn"
              onClick={handleLogin}>
              Login
            </button>
          )}

        </div>
      )}

    </nav>
  )
}

export default Navbar