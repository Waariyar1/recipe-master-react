import { Link } from "react-router-dom"
import PropTypes from "prop-types"

const RecipeCard = ({ recipe }) => {
  const { id, title, description, image, cookingTime, calories, servings, tags, rating } = recipe

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i 
          key={`full-${i}`} 
          className="fas fa-star"
          aria-hidden="true"
        ></i>
      )
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <i 
          key="half" 
          className="fas fa-star-half-alt"
          aria-hidden="true"
        ></i>
      )
    }

    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i 
          key={`empty-${i}`} 
          className="far fa-star"
          aria-hidden="true"
        ></i>
      )
    }

    return (
      <div className="recipe-rating text-warning" aria-label={`Rating: ${rating} out of 5 stars`}>
        {stars}
      </div>
    )
  }

  return (
    <div className="card recipe-card border-0 shadow-sm h-100 overflow-hidden">
      <div className="position-relative recipe-img-container">
        <img
          src={image || "/placeholder.svg"}
          className="card-img-top"
          alt={title}
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://placehold.co/600x400/e74c3c/ffffff?text=Recipe+Image"
            e.target.onerror = null // Prevent infinite loop
          }}
        />
        <div className="recipe-overlay">
          <div className="recipe-tags">
            {tags &&
              tags.map((tag, index) => (
                <span 
                  key={index} 
                  className={`badge text-bg-${index === 0 ? "danger" : "success"}`}
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>
      </div>
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0">{title}</h5>
          {renderStars(rating)}
        </div>
        <p className="card-text flex-grow-1">{description}</p>
        <div className="recipe-meta d-flex justify-content-between text-muted mt-3">
          <span aria-label={`Cooking time: ${cookingTime}`}>
            <i className="far fa-clock me-1" aria-hidden="true"></i> {cookingTime}
          </span>
          <span aria-label={`Calories: ${calories}`}>
            <i className="fas fa-fire me-1" aria-hidden="true"></i> {calories}
          </span>
          <span aria-label={`Servings: ${servings}`}>
            <i className="fas fa-user me-1" aria-hidden="true"></i> {servings}
          </span>
        </div>
      </div>
      <div className="card-footer bg-white border-0 pt-0">
        <Link 
          to={`/recipe/${id}`} 
          className="btn btn-outline-danger w-100"
          aria-label={`View recipe for ${title}`}
        >
          View Recipe
        </Link>
      </div>
    </div>
  )
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    cookingTime: PropTypes.string.isRequired,
    calories: PropTypes.string.isRequired,
    servings: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    rating: PropTypes.number.isRequired
  }).isRequired
}

export default RecipeCard
