import { Link, Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import CartItem from "./CartItem";
import AboutUs from "./AboutUs";
import "./App.css";

function LandingPage() {
  return (
    <div className="landing-page">
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

      <main className="hero-section">
        <div className="hero-content">
          <p className="hero-tagline">Bring Nature Into Your Home</p>

          <h1>Paradise Nursery</h1>

          <p className="hero-description">
            Discover beautiful houseplants that bring freshness, beauty,
            and a touch of nature into your everyday life.
          </p>

          <Link className="get-started-btn" to="/plants">
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/plants" element={<ProductList />} />
      <Route path="/cart" element={<CartItem />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}

export default App;
