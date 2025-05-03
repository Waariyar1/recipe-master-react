"use client"

import { useState, useEffect, useMemo } from "react"
import { Link, useLocation } from "react-router-dom"
import NewsletterForm from "../components/forms/NewsletterForm"
import recipes from '../data/recipes'

const AllRecipes = () => {
  const location = useLocation()
  const [activeCategory, setActiveCategory] = useState("All Categories")
  const [activeTime, setActiveTime] = useState("All")
  const [activeRating, setActiveRating] = useState("All Ratings")
  const [sortBy, setSortBy] = useState("Most Popular")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const recipesPerPage = 6

  // Check for hash in URL to set initial category
  useEffect(() => {
    const hash = location.hash.replace("#", "")
    if (hash) {
      // Convert hash to proper category name format
      const formattedHash = hash
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      setActiveCategory(formattedHash)
    }
  }, [location])

  // Filter and sort recipes
  const filteredRecipes = useMemo(() => {
    let result = [...recipes]

    // Filter by category
    if (activeCategory !== "All Categories") {
      result = result.filter((recipe) => recipe.category === activeCategory || recipe.dietType === activeCategory)
    }

    // Filter by time
    if (activeTime !== "All") {
      switch (activeTime) {
        case "Under 15 minutes":
          result = result.filter((recipe) => Number.parseInt(recipe.cookingTime) < 15)
          break
        case "15-30 minutes":
          result = result.filter(
            (recipe) => Number.parseInt(recipe.cookingTime) >= 15 && Number.parseInt(recipe.cookingTime) <= 30,
          )
          break
        case "30-60 minutes":
          result = result.filter(
            (recipe) => Number.parseInt(recipe.cookingTime) > 30 && Number.parseInt(recipe.cookingTime) <= 60,
          )
          break
        case "Over 60 minutes":
          result = result.filter((recipe) => Number.parseInt(recipe.cookingTime) > 60)
          break
        default:
          break
      }
    }

    // Filter by rating
    if (activeRating !== "All Ratings") {
      const minRating = Number.parseInt(activeRating.charAt(0))
      result = result.filter((recipe) => recipe.rating >= minRating)
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      result = result.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchLower) ||
          recipe.description.toLowerCase().includes(searchLower),
      )
    }

    // Sort recipes
    switch (sortBy) {
      case "Most Popular":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "Newest":
        // In a real app, you would sort by date
        break
      case "Oldest":
        // In a real app, you would sort by date
        break
      case "A-Z":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "Z-A":
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
      default:
        break
    }

    return result
  }, [activeCategory, activeTime, activeRating, sortBy, searchTerm])

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory, activeTime, activeRating, sortBy, searchTerm])

  // Get current recipes for pagination
  const currentRecipes = useMemo(() => {
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    return filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
  }, [currentPage, filteredRecipes])

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <>
      {/* Page Title */}
      <section className="bg-danger text-white py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-3">All Recipes</h1>
          <p className="lead mb-4">Explore our collection of delicious recipes from around the world</p>

          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search recipes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search recipes"
                />
                <button 
                  className="btn btn-light" 
                  type="button"
                  aria-label="Search"
                >
                  <i className="fas fa-search" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-4 bg-light border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <div className="d-flex align-items-center flex-wrap">
                <span className="me-3">Filter By:</span>
                <div className="btn-group me-2 mb-2 mb-md-0">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary dropdown-toggle" 
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    aria-label="Category filter"
                  >
                    {activeCategory}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button 
                        className="dropdown-item" 
                        onClick={() => setActiveCategory("All Categories")}
                      >
                        All Categories
                      </button>
                    </li>
                    <li>
                      <button 
                        className="dropdown-item" 
                        onClick={() => setActiveCategory("Vegetarian")}
                      >
                        Vegetarian
                      </button>
                    </li>
                    <li>
                      <button 
                        className="dropdown-item" 
                        onClick={() => setActiveCategory("Vegan")}
                      >
                        Vegan
                      </button>
                    </li>
                    <li>
                      <button 
                        className="dropdown-item" 
                        onClick={() => setActiveCategory("Non-Veg")}
                      >
                        Non-Veg
                      </button>
                    </li>
                    <li>
                      <button 
                        className="dropdown-item" 
                        onClick={() => setActiveCategory("Seafood")}
                      >
                        Seafood
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="btn-group me-2 mb-2 mb-md-0">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary dropdown-toggle" 
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    aria-label="Time filter"
                  >
                    {activeTime}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button 
                        className="dropdown-item" 
                        onClick={() => setActiveTime("All")}
                      >
                        All
                      </button>
                    </li>
                    <li>
                      <button 
                        className="dropdown-item" 
                        onClick={() => setActiveTime("Under 15 minutes")}
                      >
                        Under 15 minutes
                      </button>
                    </li>
                    <li>
                      <button 
                        className="dropdown-item" 
                        onClick={() => setActiveTime("15-30 minutes")}
                      >
                        15-30 minutes
                      </button>
                    </li>
                    <li>
                      <button 
                        className="dropdown-item" 
                        onClick={() => setActiveTime("30-60 minutes")}
                      >
                        30-60 minutes
                      </button>
                    </li>
                    <li>
                      <button 
                        className="dropdown-item" 
                        onClick={() => setActiveTime("Over 60 minutes")}
                      >
                        Over 60 minutes
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="btn-group">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary dropdown-toggle" 
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    aria-label="Rating filter"
                  >
                    {activeRating}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button 
                        className="dropdown-item" 
                        onClick={() => setActiveRating("All Ratings")}
                      >
                        All Ratings
                      </button>
                    </li>
                    <li>
                      <button 
                        className="dropdown-item" 
                        onClick={() => setActiveRating("4+ Stars")}
                      >
                        4+ Stars
                      </button>
                    </li>
                    <li>
                      <button 
                        className="dropdown-item" 
                        onClick={() => setActiveRating("3+ Stars")}
                      >
                        3+ Stars
                      </button>
                    </li>
                    <li>
                      <button 
                        className="dropdown-item" 
                        onClick={() => setActiveRating("2+ Stars")}
                      >
                        2+ Stars
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex justify-content-md-end">
                <div className="btn-group">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary dropdown-toggle" 
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    aria-label="Sort by"
                  >
                    Sort By: {sortBy}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button 
                        className="dropdown-item" 
                        onClick={() => setSortBy("Most Popular")}
                      >
                        Most Popular
                      </button>
                    </li>
                    <li>
                      <button 
                        className="dropdown-item" 
                        onClick={() => setSortBy("Newest")}
                      >
                        Newest
                      </button>
                    </li>
                    <li>
                      <button 
                        className="dropdown-item" 
                        onClick={() => setSortBy("Oldest")}
                      >
                        Oldest
                      </button>
                    </li>
                    <li>
                      <button 
                        className="dropdown-item" 
                        onClick={() => setSortBy("A-Z")}
                      >
                        A-Z
                      </button>
                    </li>
                    <li>
                      <button 
                        className="dropdown-item" 
                        onClick={() => setSortBy("Z-A")}
                      >
                        Z-A
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="py-5">
        <div className="container">
          {filteredRecipes.length === 0 ? (
            <div className="text-center py-5">
              <h3>No recipes found</h3>
              <p className="text-muted">Try adjusting your filters or search term</p>
            </div>
          ) : (
            <>
              <div className="row g-4">
                {currentRecipes.map((recipe) => (
                  <div key={recipe.id} className="col-md-6 col-lg-4">
                    <div className="card h-100">
                      <img
                        src={recipe.image}
                        className="card-img-top"
                        alt={recipe.title}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/600x400/e74c3c/ffffff?text=Recipe+Image"
                          e.target.onerror = null
                        }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{recipe.title}</h5>
                        <p className="card-text">{recipe.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-muted">
                            <i className="far fa-clock me-1" aria-hidden="true"></i>
                            {recipe.cookingTime}
                          </span>
                          <span className="text-warning">
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={`star-${recipe.id}-${i}`}
                                className={`fas fa-star${i < Math.floor(recipe.rating) ? "" : "-half-alt"}`}
                                aria-hidden="true"
                              ></i>
                            ))}
                            <span className="ms-1 text-dark">{recipe.rating}</span>
                          </span>
                        </div>
                      </div>
                      <div className="card-footer bg-white border-0">
                        <Link 
                          to={`/recipe/${recipe.id}`} 
                          className="btn btn-outline-danger w-100"
                          aria-label={`View recipe for ${recipe.title}`}
                        >
                          View Recipe
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="mt-5" aria-label="Recipe pagination">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Previous page"
                      >
                        <i className="fas fa-chevron-left" aria-hidden="true"></i>
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                      <li key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => paginate(index + 1)}
                          aria-label={`Page ${index + 1}`}
                          aria-current={currentPage === index + 1 ? "page" : undefined}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        aria-label="Next page"
                      >
                        <i className="fas fa-chevron-right" aria-hidden="true"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AllRecipes
