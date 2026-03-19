import React, { useState } from 'react'
import { MdCloudUpload } from 'react-icons/md'
import { categories } from '../../data/menuData'
import { addFoodAPI } from '../../services/api'
import './AddFood.css'

const AddFood = () => {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  })

  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = 
    useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(
    { text: "", type: "" })

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setImagePreview(
        URL.createObjectURL(file))
    }
  }

  // Handle submit
  const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  setMessage({ text: "", type: "" })

  // ✅ Add these debug lines
  console.log("Form data:", formData)
  console.log("Image:", image)
  console.log("Token:", 
    localStorage.getItem('token'))

  try {
    // ✅ Create FormData
    // Because we sending image file!
    const data = new FormData()
    data.append('name', formData.name)
    data.append('description', 
      formData.description)
    data.append('price', formData.price)
    data.append('category', formData.category)
    data.append('image', image)

    // ✅ Call API
    const response = await addFoodAPI(data)

    if (response.data) {
      setMessage({
        text: "Food added successfully!",
        type: "success"
      })
      // Reset form
      handleReset()
    }

  } catch (error) {
    console.error("Error adding food:", error)
    setMessage({
      text: error.response?.data?.message
        || "Failed to add food!",
      type: "error"
    })
  } finally {
    setLoading(false)
  }
}

  // Reset form
  const handleReset = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
    })
    setImage(null)
    setImagePreview(null)
  }

  return (
   <div className="add-food-page"
  style={{
    width: '100%',
    margin: '0',
    padding: '0',
  }}>

      {/* Header */}
      <div className="page-header">
        <div>
          <p className="page-tagline">
            ✦ Restaurant Management
          </p>
          <h1 className="page-title">
            Add New Food
          </h1>
        </div>
      </div>

      {/* Success/Error Message */}
      {message.text && (
        <div className={`alert-message 
          ${message.type === 'success'
            ? 'alert-success'
            : 'alert-error'}`}>
          {message.type === 'success'
            ? '✓' : '✗'}
          {message.text}
        </div>
      )}

      {/* Form */}
      <div className="add-food-form-wrapper">
        <form
          className="add-food-form"
          onSubmit={handleSubmit}>

          {/* Left — Image Upload */}
          <div className="form-left">

            <p className="form-section-label">
              Food Image
            </p>

            {/* Image Upload Area */}
            <label
              htmlFor="image-upload"
              className="image-upload-area">

              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="image-preview"
                />
              ) : (
                <div className="upload-placeholder">
                  <MdCloudUpload
                    size={48}
                    className="upload-icon"
                  />
                  <p className="upload-text">
                    Click to upload image
                  </p>
                  <p className="upload-hint">
                    JPG, PNG up to 5MB
                  </p>
                </div>
              )}

              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                required
              />
            </label>

            {/* Change image button */}
            {imagePreview && (
              <label
                htmlFor="image-upload"
                className="change-image-btn">
                Change Image
              </label>
            )}

          </div>

          {/* Right — Food Details */}
          <div className="form-right">

            <p className="form-section-label">
              Food Details
            </p>

            {/* Food Name */}
            <div className="form-group">
              <label className="form-label">
                Food Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Chicken Biryani"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Describe the food item..."
                value={formData.description}
                onChange={handleChange}
                className="form-input form-textarea"
                rows={4}
                required
              />
            </div>

            {/* Price + Category */}
            <div className="form-row">

              {/* Price */}
              <div className="form-group">
                <label className="form-label">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="e.g. 199"
                  value={formData.price}
                  onChange={handleChange}
                  className="form-input"
                  min="1"
                  required
                />
              </div>

              {/* Category */}
              <div className="form-group">
                <label className="form-label">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-input 
                             form-select"
                  required>
                  <option value="">
                    Select category
                  </option>
                  {categories
                    .filter(cat => 
                      cat.name !== "All")
                    .map((cat) => (
                      <option
                        key={cat.name}
                        value={cat.name}>
                        {cat.emoji} {cat.name}
                      </option>
                    ))}
                </select>
              </div>

            </div>

            {/* Buttons */}
            <div className="form-buttons">
              <button
                type="submit"
                className="submit-btn"
                disabled={loading}>
                {loading
                  ? "Adding..."
                  : "Add Food Item"}
              </button>
              <button
                type="button"
                className="reset-btn"
                onClick={handleReset}>
                Reset
              </button>
            </div>

          </div>

        </form>
      </div>

    </div>
  )
}

export default AddFood