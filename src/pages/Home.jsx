import { useEffect } from "react"
import { Link } from "react-router-dom"
import NewsletterForm from "../components/forms/NewsletterForm"
import RecipeCard from "../components/recipes/RecipeCard"
import CategoryCard from "../components/categories/CategoryCard"
import AOS from "aos"
import { featuredRecipes, categories } from "../data/homeData"

const Home = () => {
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      disable: window.innerWidth < 768 // Disable on mobile
    })

    // Cleanup
    return () => {
      AOS.refresh()
    }
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section position-relative">
        <div className="hero-overlay"></div>
        <div className="container position-relative z-2 py-5">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6 text-center text-lg-start" data-aos="fade-right" data-aos-duration="1000">
              <h1 className="display-3 fw-bold text-white mb-4">Discover Delicious Recipes</h1>
              <p className="lead text-white-75 mb-4">
                Explore a world of flavors with our curated collection of recipes from around the globe.
              </p>
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                <Link to="/all-recipes" className="btn btn-danger btn-lg rounded-pill px-4">
                  Get Started
                </Link>
                <a href="#recipes" className="btn btn-outline-light btn-lg rounded-pill px-4">
                  Browse Recipes
                </a>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block" data-aos="fade-left" data-aos-duration="1000">
              <img
                src="/recipe-master/public/bg.png"
                className="img-fluid rounded-4 shadow-lg floating-img"
                alt="Food collage"
                onError={(e) => {
                  e.target.src = "https://i.ibb.co/r11rSKz/hr.png"
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Food Categories */}
      <section className="py-5 bg-dark text-white">
        <div className="container py-4">
          <h2 className="text-center mb-5 fw-bold" data-aos="fade-up">
            Popular Categories
          </h2>
          <div className="row g-4 justify-content-center">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} delay={(index + 1) * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-5" id="recipes">
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h2 className="fw-bold mb-0" data-aos="fade-right">
              Featured Recipes
            </h2>
            <Link to="/AllRecipes" className="btn btn-outline-danger rounded-pill" data-aos="fade-left">
              View All <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>

          <div className="row g-4">
            {featuredRecipes.map((recipe, index) => (
              <div
                className="col-md-6 col-lg-4"
                key={recipe.id}
                data-aos="fade-up"
                data-aos-delay={((index % 3) + 1) * 100}
              >
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/all-recipes" className="btn btn-danger btn-lg rounded-pill px-4 py-2">
              Explore All Recipes <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center" data-aos="fade-up">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
