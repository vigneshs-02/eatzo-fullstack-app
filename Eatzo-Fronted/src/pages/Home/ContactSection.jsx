import React, { useState } from 'react'
import './ContactSection.css'

const ContactSection = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Contact form:", formData)
    setSubmitted(true)
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    })
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section
      className="contact-section"
      id="contact">

      {/* Header */}
      <div className="contact-header">
        <p className="contact-tagline">
          ✦ We'd Love to Hear From You
        </p>
        <h2 className="contact-title">
          Get In Touch
        </h2>
        <div className="contact-divider">
          <span className="divider-line"></span>
          <span className="divider-diamond">◆</span>
          <span className="divider-line"></span>
        </div>
        <p className="contact-subtitle">
          Have a question or want to make
          a reservation? We're here to help!
        </p>
      </div>

      {/* Content */}
      <div className="contact-content">

        {/* LEFT — Info + Map */}
        <div className="contact-left">

          {/* Info Cards */}
          <div className="contact-info-cards">

            <div className="info-card">
              <div className="info-card-icon">
                📍
              </div>
              <div className="info-card-text">
                <h4>Our Location</h4>
                <p>123 Food Street,
                  Anna Nagar,
                  Chennai - 600040,
                  Tamil Nadu</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-card-icon">
                📞
              </div>
              <div className="info-card-text">
                <h4>Phone Number</h4>
                <p>+91 98765 43210</p>
                <p>+91 91234 56789</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-card-icon">
                📧
              </div>
              <div className="info-card-text">
                <h4>Email Address</h4>
                <p>hello@eatzo.com</p>
                <p>support@eatzo.com</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-card-icon">
                🕐
              </div>
              <div className="info-card-text">
                <h4>Opening Hours</h4>
                <p>Monday - Friday:
                  10AM - 11PM</p>
                <p>Saturday - Sunday:
                  9AM - 12AM</p>
              </div>
            </div>

          </div>

          {/* Map */}
          <div className="contact-map">
            <div className="map-header">
              <p className="map-label">
                ✦ Find Us Here
              </p>
            </div>
            <div className="map-wrapper">
              <iframe
                title="Eatzo Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0867893349564!2d80.20973!3d13.08784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA1JzE2LjIiTiA4MMKwMTInMzUuMSJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

        {/* RIGHT — Contact Form */}
        <div className="contact-right">

          <div className="contact-form-wrapper">

            <h3 className="form-title">
              Send Us a Message
            </h3>

            {/* Success Message */}
            {submitted && (
              <div className="success-message">
                <span>✓</span>
                Message sent successfully!
                We'll get back to you soon.
              </div>
            )}

            <form
              className="contact-form"
              onSubmit={handleSubmit}>

              {/* Name */}
              <div className="form-group">
                <label className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              {/* Email + Phone */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="form-group">
                <label className="form-label">
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  className="form-input form-textarea"
                  rows={5}
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="contact-submit-btn">
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  )
}

export default ContactSection