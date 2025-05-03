import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen)
  }

  const handleLoginClick = (e) => {
    e.preventDefault()
    setShowLoginModal(true)
    window.dispatchEvent(new CustomEvent("openLoginModal"))
  }

  // Close offcanvas when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const offcanvas = document.getElementById("mobileMenu")
      const navbarToggler = document.querySelector(".navbar-toggler")
      
      if (isOffcanvasOpen && 
          offcanvas && 
          !offcanvas.contains(e.target) && 
          navbarToggler && 
          !navbarToggler.contains(e.target)) {
        setIsOffcanvasOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isOffcanvasOpen])

  // Close offcanvas when route changes
  useEffect(() => {
    if (isOffcanvasOpen) {
      setIsOffcanvasOpen(false)
    }
  }, [window.location.pathname])

  return (
    <>
      <header className="bg-dark text-white py-3 shadow sticky-top">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/" className="navbar-brand text-white fs-3 fw-bold d-flex align-items-center">
            <i className="fas fa-utensils me-2"></i>RecipeMaster
          </Link>

          <nav className="d-none d-lg-block">
            <ul className="nav">
              <li className="nav-item">
                <Link className="nav-link text-white hover-effect" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white hover-effect" to="/all-recipes">
                  Recipes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white hover-effect" to="/categories">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white hover-effect" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white hover-effect" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="d-flex gap-2 align-items-center">
            <button 
              className="btn btn-outline-light rounded-pill px-3" 
              onClick={handleLoginClick}
              aria-label="Login"
            >
              Login
            </button>
            <button 
              className="navbar-toggler d-lg-none" 
              type="button" 
              onClick={toggleOffcanvas}
              aria-label="Toggle navigation"
              aria-expanded={isOffcanvasOpen}
            >
              <i className="fas fa-bars text-white"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`offcanvas offcanvas-end bg-dark text-white ${isOffcanvasOpen ? "show" : ""}`}
        tabIndex="-1"
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="mobileMenuLabel">RecipeMaster</h5>
          <button 
            type="button" 
            className="btn-close btn-close-white" 
            onClick={toggleOffcanvas}
            aria-label="Close menu"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            <li className="nav-item mb-3">
              <Link className="nav-link text-white" to="/" onClick={toggleOffcanvas}>
                Home
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link className="nav-link text-white" to="/all-recipes" onClick={toggleOffcanvas}>
                Recipes
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link className="nav-link text-white" to="/categories" onClick={toggleOffcanvas}>
                Categories
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link className="nav-link text-white" to="/about" onClick={toggleOffcanvas}>
                About
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link className="nav-link text-white" to="/contact" onClick={toggleOffcanvas}>
                Contact
              </Link>
            </li>
            <li className="nav-item mt-3">
              <button 
                className="btn btn-outline-light w-100" 
                onClick={handleLoginClick}
                aria-label="Login"
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar
