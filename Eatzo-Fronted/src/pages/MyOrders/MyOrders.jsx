import React, { useContext, useEffect, useState } from 'react'
import { myContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import { BsBoxSeam } from 'react-icons/bs'
import { getUserOrdersAPI } 
  from '../../services/api'
import './MyOrders.css'

const MyOrders = () => {

   const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

 const { userId, token } = 
    useContext(myContext)

  const navigate = useNavigate()

   useEffect(() => {
    const fetchOrders = async () => {

      // If not logged in → skip
      if (!token || !userId) return

      setLoading(true)
      try {
        const response = await 
          getUserOrdersAPI(userId)
        const data = response.data
setOrders(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error(
          "Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [userId, token])

  // Status color + label
  const getStatusInfo = (status) => {
    switch(status) {
      case "PENDING":
        return { 
          color: "#f0a500", 
          label: "Pending",
          dot: "🟡"
        }
      case "CONFIRMED":
        return { 
          color: "#4a9eff", 
          label: "Confirmed",
          dot: "🔵"
        }
      case "OUT_FOR_DELIVERY":
        return { 
          color: "#d4a843", 
          label: "Out for Delivery",
          dot: "🟠"
        }
      case "DELIVERED":
        return { 
          color: "#4caf50", 
          label: "Delivered",
          dot: "🟢"
        }
      case "CANCELLED":
        return { 
          color: "#ff4444", 
          label: "Cancelled",
          dot: "🔴"
        }
      default:
        return { 
          color: "#666666", 
          label: status,
          dot: "⚪"
        }
    }
  }

  return (
    <div className="my-orders-page">

      {/* Header */}
      <div className="my-orders-header">
        <p className="my-orders-tagline">
          ✦ Your History
        </p>
        <h1 className="my-orders-title">
          My Orders
        </h1>
        <div className="my-orders-divider">
          <span className="divider-line"></span>
          <span className="divider-diamond">◆</span>
          <span className="divider-line"></span>
        </div>
      </div>

      {/* Orders List */}
      {Array.isArray(orders) && 
 orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order) => {

            const statusInfo = 
              getStatusInfo(order.status)

            return (
              <div 
                key={order.id}
                className="order-card">

                {/* Order Card Header */}
                <div className="order-card-header">

                  <div className="order-id-section">
                    <BsBoxSeam 
                      size={18}
                      className="order-icon" />
                    <div>
                      <p className="order-id">
                        Order #{order.id}
                      </p>
                      <p className="order-date">
                        {order.createdAt}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div
                    className="order-status-badge"
                    style={{ 
                      borderColor: statusInfo.color,
                      color: statusInfo.color 
                    }}>
                    <span className="status-dot">
                      {statusInfo.dot}
                    </span>
                    {statusInfo.label}
                  </div>

                </div>

                {/* Order Items */}
                <div className="order-items-list">
                 {order.items && order.items.map(
  (item, index) => (
                    <span
                      key={index}
                      className="order-item-tag">
                      {item.name} x{item.qty}
                    </span>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="order-card-footer">

                  <div className="order-meta">
                    <div className="order-meta-item">
                      <span className="meta-label">
                        Total
                      </span>
                      <span className="meta-value 
                                       meta-price">
                        ₹{order.totalAmount}
                      </span>
                    </div>
                    <div className="order-meta-item">
                      <span className="meta-label">
                        Payment
                      </span>
                      <span className="meta-value">
                        {order.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="order-progress">
                    <div className="progress-steps">

                      {["PENDING", "CONFIRMED",
                        "OUT_FOR_DELIVERY",
                        "DELIVERED"].map(
                        (step, index) => {

                        const steps = [
                          "PENDING",
                          "CONFIRMED",
                          "OUT_FOR_DELIVERY",
                          "DELIVERED"
                        ]
                        const currentIndex = 
                          steps.indexOf(order.status)
                        const isCompleted = 
                          index <= currentIndex

                        return (
                          <div
                            key={step}
                            className="progress-step">
                            <div
                              className={`step-circle
                                ${isCompleted 
                                  ? 'step-completed' 
                                  : ''}`}>
                              {isCompleted 
                                ? '✓' 
                                : index + 1}
                            </div>
                            <p className={`step-label
                              ${isCompleted 
                                ? 'step-label-active' 
                                : ''}`}>
                              {step === "PENDING" 
                                && "Pending"}
                              {step === "CONFIRMED" 
                                && "Confirmed"}
                              {step === "OUT_FOR_DELIVERY"
                                && "On the way"}
                              {step === "DELIVERED" 
                                && "Delivered"}
                            </p>
                            {index < 3 && (
                              <div className={`
                                step-line
                                ${index < currentIndex
                                  ? 'step-line-active'
                                  : ''}`}>
                              </div>
                            )}
                          </div>
                        )
                      })}

                    </div>
                  </div>

                  {/* Track Button */}
                  <button className="track-btn">
                    Track Order
                  </button>

                </div>

              </div>
            )
          })}
        </div>
      ) : (

        /* Empty Orders */
        <div className="orders-empty">
          <BsBoxSeam
            size={80}
            className="empty-orders-icon" />
          <h2 className="empty-orders-title">
            No orders yet!
          </h2>
          <p className="empty-orders-sub">
            Looks like you haven't placed
            any orders yet.
          </p>
          <button
            className="start-ordering-btn"
            onClick={() => navigate('/')}>
            Start Ordering
          </button>
        </div>

      )}

    </div>
  )
}

export default MyOrders