"use client"

import { useState } from "react"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [formMessage, setFormMessage] = useState("")
  const [formMessageType, setFormMessageType] = useState("")

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormMessage("Please fill out all fields.")
      setFormMessageType("danger")
      return
    }

    // Form is valid, submit it (in a real app, you would send this to your backend)
    setFormMessage("Thank you for reaching out! We will get back to you soon.")
    setFormMessageType("success")
    setFormData({
      name: "",
      email: "",
      message: "",
    })

    // Reset message after 5 seconds
    setTimeout(() => {
      setFormMessage("")
    }, 5000)
  }

  return (
    <>
      {/* Page Header */}
      <header className="bg-light py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Contact Us</h1>
          <p className="lead">We'd love to hear from you! Reach out to us with any questions or feedback.</p>
        </div>
      </header>

      {/* Contact Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            {/* Contact Form */}
            <div className="col-lg-6 mb-4">
              <h2 className="fw-bold mb-4">Send Us a Message</h2>

              {formMessage && (
                <div className={`alert alert-${formMessageType} mb-4`} role="alert">
                  {formMessage}
                </div>
              )}

              <form id="contactForm" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Your Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Your Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="5"
                    placeholder="Write your message here"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-danger px-4">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Details */}
            <div className="col-lg-6">
              <h2 className="fw-bold mb-4">Get in Touch</h2>
              <p className="text-muted mb-4">Feel free to reach out to us through any of the following methods:</p>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <i className="fas fa-envelope text-danger me-2"></i>
                  <strong>Email:</strong> support@tastydelights.com
                </li>
                <li className="mb-3">
                  <i className="fas fa-phone text-danger me-2"></i>
                  <strong>Phone:</strong> +1 234 567 890
                </li>
                <li className="mb-3">
                  <i className="fas fa-map-marker-alt text-danger me-2"></i>
                  <strong>Address:</strong> 123 Food Street, Culinary City, FL 12345
                </li>
              </ul>
              <h3 className="fw-bold mb-3">Follow Us</h3>
              <div className="d-flex gap-3">
                <a href="#" className="text-danger fs-4">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-danger fs-4">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-danger fs-4">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-danger fs-4">
                  <i className="fab fa-pinterest"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
