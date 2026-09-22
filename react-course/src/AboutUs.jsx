import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <div className="about-page">
      <nav className="navbar">
        <div className="brand">
          <span className="brand-icon">🌿</span>
          <span>Paradise Nursery</span>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/plants">Plants</Link>
          <Link to="/about">About Us</Link>
          <Link to="/cart">🛒 Cart</Link>
        </div>
      </nav>

      <main className="about-content">
        <section className="about-card">
          <p className="hero-tagline">About Our Nursery</p>

          <h1>Paradise Nursery</h1>

          <p>
            Paradise Nursery is an online houseplant store created to make
            beautiful and healthy plants easily accessible to plant lovers.
          </p>

          <p>
            We offer a carefully selected collection of indoor plants,
            succulents, and flowering plants. Our goal is to help customers
            bring natural beauty, freshness, and a peaceful atmosphere into
            their homes and workspaces.
          </p>

          <p>
            Whether you are an experienced plant enthusiast or buying your
            first houseplant, Paradise Nursery provides a simple shopping
            experience with clear plant information and an easy-to-use cart.
          </p>

          <Link className="get-started-btn" to="/plants">
            Explore Plants
          </Link>
        </section>
      </main>
    </div>
  );
}

export default AboutUs;
