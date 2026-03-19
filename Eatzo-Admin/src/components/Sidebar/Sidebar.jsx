import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdAddBox, MdListAlt, MdShoppingBag }
  from 'react-icons/md'
import './Sidebar.css'

const sidebarLinks = [
  {
    path: "/add",
    icon: <MdAddBox size={20} />,
    label: "Add Food",
  },
  {
    path: "/list",
    icon: <MdListAlt size={20} />,
    label: "Food List",
  },
  {
    path: "/orders",
    icon: <MdShoppingBag size={20} />,
    label: "Orders",
  },
]

const Sidebar = () => {
  return (
    <aside className="admin-sidebar">

      {/* Menu Label */}
      <p className="sidebar-menu-label">
        Main Menu
      </p>

      {/* Links */}
      <nav className="sidebar-nav">
        {sidebarLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `sidebar-link 
               ${isActive 
                 ? 'sidebar-link-active' 
                 : ''}`
            }>

            <span className="sidebar-icon">
              {link.icon}
            </span>
            <span className="sidebar-label">
              {link.label}
            </span>

          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="sidebar-bottom">
        <div className="sidebar-divider"></div>
        <p className="sidebar-version">
          Eatzo Admin v1.0
        </p>
      </div>

    </aside>
  )
}

export default Sidebar