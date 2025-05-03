"use client"

import { useState, useEffect } from "react"

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Set the top coordinate to 0
  // Make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <button
      id="backToTop"
      className="btn btn-danger btn-icon"
      onClick={scrollToTop}
      style={{ display: isVisible ? "flex" : "none" }}
    >
      <i className="fas fa-chevron-up"></i>
    </button>
  )
}

export default BackToTop
