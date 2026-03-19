import React, { useState,useEffect } from 'react'
import { MdShoppingBag } from 'react-icons/md'
import { 
  getAllOrdersAPI,
  updateOrderStatusAPI 
} from '../../services/api'
import './Orders.css'

const Orders = () => {

  const [orders, setOrders] = useState([])

  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await getAllOrdersAPI()
      setOrders(Array.isArray(response.data)
        ? response.data : [])
    } catch (error) {
      console.error(
        "Error fetching orders:", error)
    }
  }
  fetchOrders()
}, [])

  const handleStatusChange = async (
    orderId, status) => {
  try {
    await updateOrderStatusAPI(orderId, status)
    // Update local state
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status: status }
        : order
    ))
  } catch (error) {
    console.error(
      "Error updating status:", error)
  }
}

  // Status color
  const getStatusColor = (status) => {
    switch(status) {
      case "PENDING":
        return "#f0a500"
      case "CONFIRMED":
        return "#4a9eff"
      case "OUT_FOR_DELIVERY":
        return "#d4a843"
      case "DELIVERED":
        return "#4caf50"
      case "CANCELLED":
        return "#ff4444"
      default:
        return "#666666"
    }
  }

  return (
    <div className="orders-page">

      {/* Header */}
      <div className="page-header">
        <div>
          <p className="page-tagline">
            ✦ Restaurant Management
          </p>
          <h1 className="page-title">
            Orders
          </h1>
        </div>
        <div className="header-stats">
          <div className="stat-chip">
            <span className="stat-dot pending">
            </span>
            <span>Pending: {orders.filter(
              o => o.status === "PENDING"
            ).length}</span>
          </div>
          <div className="stat-chip">
            <span className="stat-dot delivered">
            </span>
            <span>Delivered: {orders.filter(
              o => o.status === "DELIVERED"
            ).length}</span>
          </div>
        </div>
      </div>

      {/* Orders List */}
      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order) => (
            <div
              key={order.id}
              className="order-card">

              {/* Order Header */}
              <div className="order-card-top">
                <div className="order-id-info">
                  <MdShoppingBag
                    size={18}
                    className="order-bag-icon"
                  />
                  <div>
                    <p className="order-id-text">
                      Order #{order.id}
                    </p>
                    <p className="order-date-text">
                      {order.createdAt}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div
                  className="order-status-badge"
                  style={{
                    borderColor: getStatusColor(
                      order.status),
                    color: getStatusColor(
                      order.status)
                  }}>
                  {order.status}
                </div>
              </div>

              {/* Order Body */}
              <div className="order-card-body">

                {/* Left — Customer + Items */}
                <div className="order-left">

                  {/* Customer Info */}
                  <div className="customer-info">
                    <p className="info-label">
                      Customer
                    </p>
                    <p className="info-value">
                      User #{order.userId}
                    </p>
                  </div>

                  {/* Address */}
                  <div className="customer-info">
                    <p className="info-label">
                      Delivery Address
                    </p>
                    <p className="info-value">
                      {order.street}, {order.city},
                      {order.state} - {order.pincode}
                    </p>
                  </div>

                  {/* Payment */}
                  <div className="customer-info">
                    <p className="info-label">
                      Payment
                    </p>
                    <p className="info-value">
                      {order.paymentMethod}
                      <span className={`payment-status
                        ${order.paymentStatus
                          ? 'paid' : 'unpaid'}`}>
                        {order.paymentStatus
                          ? ' ✓ Paid'
                          : ' ✗ Unpaid'}
                      </span>
                    </p>
                  </div>

                </div>

                {/* Right — Amount + Status Update */}
                <div className="order-right">

                  {/* Total */}
                  <div className="order-total">
                    <p className="total-label">
                      Total Amount
                    </p>
                    <p className="total-value">
                      ₹{order.totalAmount}
                    </p>
                  </div>

                  {/* Status Dropdown */}
                  <div className="status-update">
                    <p className="status-label">
                      Update Status
                    </p>
                    <select
                      className="status-select"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(
                          order.id,
                          e.target.value)}>
                      <option value="PENDING">
                        Pending
                      </option>
                      <option value="CONFIRMED">
                        Confirmed
                      </option>
                      <option value="OUT_FOR_DELIVERY">
                        Out for Delivery
                      </option>
                      <option value="DELIVERED">
                        Delivered
                      </option>
                      <option value="CANCELLED">
                        Cancelled
                      </option>
                    </select>
                  </div>

                </div>

              </div>

            </div>
          ))}
        </div>
      ) : (

        /* Empty */
        <div className="orders-empty">
          <MdShoppingBag
            size={80}
            className="empty-orders-icon"
          />
          <h2 className="empty-orders-title">
            No orders yet!
          </h2>
          <p className="empty-orders-sub">
            Orders will appear here when
            customers start ordering.
          </p>
        </div>

      )}

    </div>
  )
}

export default Orders