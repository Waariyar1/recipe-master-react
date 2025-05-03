import { Link } from "react-router-dom"

const Categories = () => {
  // Categories data
  const categories = [
    {
      id: 1,
      name: "Desserts",
      image: "./recipe-img/category-img/Desserts.jpg",
      description: "Indulge in sweet treats and delicious desserts.",
    },
    {
      id: 2,
      name: "Vegan",
      image: "./recipe-img/category-img/Vegan.jpg",
      description: "Discover healthy and delicious vegan recipes.",
    },
    {
      id: 3,
      name: "Snacks",
      image: "./recipe-img/category-img/Snacks.jpg",
      description: "Quick and easy snacks for any time of the day.",
    },
    {
      id: 4,
      name: "Main Course",
      image: "./recipe-img/category-img/main-course.jpg",
      description: "Hearty and satisfying main course recipes.",
    },
    {
      id: 5,
      name: "Beverages",
      image: "./recipe-img/category-img/Beverages.jpg",
      description: "Refreshing drinks and beverages for every occasion.",
    },
    {
      id: 6,
      name: "Appetizers",
      image: "./recipe-img/category-img/Appetizers.jpg",
      description: "Start your meal with these tasty appetizers.",
    },
  ]

  return (
    <>
      {/* Page Header */}
      <header className="bg-light py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Recipe Categories</h1>
          <p className="lead">Explore recipes by category and find your next favorite dish!</p>
        </div>
      </header>

      {/* Categories Section */}
      <section className="py-5">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {categories.map((category) => (
              <div className="col" key={category.id}>
                <div className="card h-100 shadow">
                  <img
                    src={category.image || "/placeholder.svg"}
                    className="card-img-top"
                    alt={category.name}
                    style={{ height: "200px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = `https://placehold.co/600x400/e74c3c/ffffff?text=${category.name}`
                    }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{category.name}</h5>
                    <p className="card-text">{category.description}</p>
                    <Link
                      to={`/all-recipes#${category.name.toLowerCase().replace(" ", "-")}`}
                      className="btn btn-danger"
                    >
                      View Recipes
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Categories
