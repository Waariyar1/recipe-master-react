const About = () => {
  return (
    <>
      {/* Page Header */}
      <header className="bg-light py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">About Us</h1>
          <p className="lead">Learn more about Tasty Delights and our passion for food.</p>
        </div>
      </header>

      {/* About Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img
                src="./about-img/about-us.jpg"
                alt="About Us"
                className="img-fluid rounded-4 shadow"
                onError={(e) => {
                  e.target.src = "https://placehold.co/600x400/e74c3c/ffffff?text=About+Us"
                }}
              />
            </div>
            <div className="col-lg-6">
              <h2 className="fw-bold mb-4">Who We Are</h2>
              <p className="text-muted mb-4">
                At <strong>Tasty Delights</strong>, we believe that food is more than just sustenance—it's an
                experience, a way to connect with loved ones, and a journey into different cultures. Our mission is to
                inspire home cooks and food enthusiasts with easy-to-follow recipes, cooking tips, and a passion for
                delicious meals.
              </p>
              <h3 className="fw-bold mb-3">Our Vision</h3>
              <p className="text-muted">
                To create a global community of food lovers who share their love for cooking and explore the joy of
                creating meals that bring people together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-5">Meet Our Team</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {/* Team Member 1 */}
            <div className="col">
              <div className="card h-100 shadow">
                <img
                  src="./team-img/chef1.jpg"
                  className="card-img-top"
                  alt="Chef John"
                  style={{ height: "250px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = "https://placehold.co/600x400/e74c3c/ffffff?text=Chef+John"
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Chef John</h5>
                  <p className="card-text">Head Chef & Recipe Creator</p>
                </div>
              </div>
            </div>
            {/* Team Member 2 */}
            <div className="col">
              <div className="card h-100 shadow">
                <img
                  src="./team-img/chef2.jpg"
                  className="card-img-top"
                  alt="Chef Sarah"
                  style={{ height: "250px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = "https://placehold.co/600x400/e74c3c/ffffff?text=Chef+Sarah"
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Chef Sarah</h5>
                  <p className="card-text">Pastry Chef & Dessert Specialist</p>
                </div>
              </div>
            </div>
            {/* Team Member 3 */}
            <div className="col">
              <div className="card h-100 shadow">
                <img
                  src="./team-img/chef3.jpg"
                  className="card-img-top"
                  alt="Chef Alex"
                  style={{ height: "250px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = "https://placehold.co/600x400/e74c3c/ffffff?text=Chef+Alex"
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Chef Alex</h5>
                  <p className="card-text">Food Blogger & Content Creator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
