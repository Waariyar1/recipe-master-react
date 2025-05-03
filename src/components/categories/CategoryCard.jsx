import { Link } from "react-router-dom"
import PropTypes from "prop-types"

const CategoryCard = ({ category, delay }) => {
  const { id, name, icon, color } = category

  return (
    <div 
      className="col-6 col-md-4 col-lg-2" 
      data-aos="zoom-in" 
      data-aos-delay={delay}
    >
      <Link 
        to={`/categories/${name.toLowerCase()}`} 
        className="text-decoration-none"
        aria-label={`Browse ${name} recipes`}
      >
        <div className="category-card text-center bg-white text-dark">
          <div 
            className={`category-icon bg-${color} bg-opacity-10 text-${color} mb-3`}
            aria-hidden="true"
          >
            <i className={icon}></i>
          </div>
          <h5 className="mb-0">{name}</h5>
        </div>
      </Link>
    </div>
  )
}

CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }).isRequired,
  delay: PropTypes.number
}

CategoryCard.defaultProps = {
  delay: 0
}

export default CategoryCard
