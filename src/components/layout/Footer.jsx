import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <h4 className="mb-4 fw-bold d-flex align-items-center">
              <i className="fas fa-utensils me-2"></i>RecipeMaster
            </h4>
            <p className="mb-3">
              Explore a world of flavors with our curated collection of recipes from passionate chefs around the globe.
            </p>
            <div className="d-flex gap-3 fs-5 mb-4">
              <a href="#" className="text-light">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-light">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-light">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-light">
                <i className="fab fa-pinterest"></i>
              </a>
              <a href="#" className="text-light">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          <div className="col-md-4 col-lg-2 mb-4">
            <h5 className="mb-4 fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/all-recipes" className="text-light text-decoration-none">
                  Recipes
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/categories" className="text-light text-decoration-none">
                  Categories
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-light text-decoration-none">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-light text-decoration-none">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4 col-lg-2 mb-4">
            <h5 className="mb-4 fw-bold">Categories</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Vegetarian
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Non-Vegetarian
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Vegan
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Gluten Free
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Quick & Easy
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 col-lg-4 mb-4">
            <h5 className="mb-4 fw-bold">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex">
                <i className="fas fa-map-marker-alt me-2 mt-1"></i>
                <span>123 Recipe Street, Flavor City, FC 12345</span>
              </li>
              <li className="mb-3 d-flex">
                <i className="fas fa-envelope me-2 mt-1"></i>
                <span>contact@recipemaster.com</span>
              </li>
              <li className="mb-3 d-flex">
                <i className="fas fa-phone me-2 mt-1"></i>
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center py-3 border-top border-secondary mt-4">
          <p className="mb-0">&copy; {new Date().getFullYear()} RecipeMaster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
