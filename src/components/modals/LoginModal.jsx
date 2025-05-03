import { useState, useEffect, useRef } from "react"

const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const modalRef = useRef(null)
  const usernameInputRef = useRef(null)

  useEffect(() => {
    const handleOpenModal = () => setIsOpen(true)
    window.addEventListener("openLoginModal", handleOpenModal)

    return () => {
      window.removeEventListener("openLoginModal", handleOpenModal)
    }
  }, [])

  // Focus username input when modal opens
  useEffect(() => {
    if (isOpen && usernameInputRef.current) {
      usernameInputRef.current.focus()
    }
  }, [isOpen])

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeModal()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  const closeModal = () => {
    setIsOpen(false)
    setError("")
    setUsername("")
    setPassword("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields")
      return
    }

    try {
      // Handle login logic here
      console.log("Login attempt with:", { username, password })
      // For demo purposes, just close the modal
      closeModal()
    } catch (err) {
      setError("Login failed. Please try again.")
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="modal-backdrop"
      onClick={closeModal}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1050,
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="loginModalTitle"
    >
      <div
        ref={modalRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          borderRadius: "5px",
          width: "100%",
          maxWidth: "500px",
          position: "relative",
        }}
      >
        <div className="modal-header bg-dark text-white p-3">
          <h5 className="modal-title" id="loginModalTitle">Login</h5>
          <button 
            type="button" 
            className="btn-close btn-close-white" 
            onClick={closeModal}
            aria-label="Close login modal"
          ></button>
        </div>
        <div className="modal-body bg-light p-4">
          <form onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="mt-3 text-center">
              <button 
                type="button" 
                className="btn btn-outline-danger w-100 mb-3"
                aria-label="Login with Google"
              >
                <i className="fab fa-google me-2"></i>Login with Google
              </button>
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                ref={usernameInputRef}
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-required="true"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-required="true"
                required
              />
            </div>
            <div className="d-flex justify-content-between">
              <button 
                type="button" 
                className="btn btn-link text-decoration-none p-0"
                onClick={() => {/* Handle forgot password */}}
              >
                Forgot Password?
              </button>
              <button 
                type="button" 
                className="btn btn-link text-decoration-none p-0"
                onClick={() => {/* Handle register */}}
              >
                Register
              </button>
            </div>
            <div className="mt-3">
              <button 
                type="submit" 
                className="btn btn-primary w-100"
                aria-label="Submit login form"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
