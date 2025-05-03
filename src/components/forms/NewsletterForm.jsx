"use client"

import { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"

const NewsletterForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("")
  const [isChecked, setIsChecked] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const emailInputRef = useRef(null)

  // Reset message after 3 seconds
  useEffect(() => {
    let timeoutId
    if (message) {
      timeoutId = setTimeout(() => {
        setMessage("")
      }, 3000)
    }
    return () => clearTimeout(timeoutId)
  }, [message])

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setIsSubmitting(true)

    try {
      // Validate form
      if (!email.trim()) {
        throw new Error("Please enter your email address.")
      }

      if (!validateEmail(email)) {
        throw new Error("Please enter a valid email address.")
      }

      if (!isChecked) {
        throw new Error("Please agree to receive updates.")
      }

      // Form is valid, submit it
      if (onSubmit) {
        await onSubmit({ email })
      }

      setMessage("Thank you for subscribing to our newsletter!")
      setMessageType("success")
      setEmail("")
      setIsChecked(false)
      emailInputRef.current?.focus()
    } catch (error) {
      setMessage(error.message)
      setMessageType("danger")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="newsletter-container bg-white p-4 p-md-5 rounded-4 shadow-sm">
      <h2 className="fw-bold mb-3">Get Weekly Recipe Updates</h2>
      <p className="text-muted mb-4">Subscribe to our newsletter and never miss a delicious recipe again!</p>

      {message && (
        <div 
          className={`alert alert-${messageType} mb-3`} 
          role="alert"
          aria-live="polite"
        >
          {message}
        </div>
      )}

      <form 
        className="newsletter-form" 
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="input-group mb-3">
          <input
            ref={emailInputRef}
            type="email"
            className="form-control form-control-lg"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
            aria-required="true"
            required
            disabled={isSubmitting}
          />
          <button 
            className="btn btn-danger px-4" 
            type="submit"
            disabled={isSubmitting}
            aria-label={isSubmitting ? "Subscribing..." : "Subscribe to newsletter"}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Subscribing...
              </>
            ) : (
              "Subscribe"
            )}
          </button>
        </div>
        <div className="form-check text-start">
          <input
            className="form-check-input"
            type="checkbox"
            id="newsletterCheck"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            disabled={isSubmitting}
            aria-required="true"
            required
          />
          <label className="form-check-label small text-muted" htmlFor="newsletterCheck">
            I agree to receive weekly recipe updates and cooking tips.
          </label>
        </div>
      </form>
    </div>
  )
}

NewsletterForm.propTypes = {
  onSubmit: PropTypes.func
}

export default NewsletterForm
