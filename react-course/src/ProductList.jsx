import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItem } from "./CartSlice";

const products = [
  // Indoor Plants
  {
    id: 1,
    name: "Snake Plant",
    category: "Indoor Plants",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1593482892290-f54927ae2bb3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Monstera Deliciosa",
    category: "Indoor Plants",
    price: 25,
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "ZZ Plant",
    category: "Indoor Plants",
    price: 22,
    image:
      "https://images.unsplash.com/photo-1632207691148-3a7c7d8b7d4a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Peace Lily",
    category: "Indoor Plants",
    price: 20,
    image:
      "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Rubber Plant",
    category: "Indoor Plants",
    price: 24,
    image:
      "https://images.unsplash.com/photo-1614594895304-fe7116ac3b85?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Spider Plant",
    category: "Indoor Plants",
    price: 16,
    image:
      "https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=600&q=80",
  },

  // Succulents
  {
    id: 7,
    name: "Aloe Vera",
    category: "Succulents",
    price: 14,
    image:
      "https://images.unsplash.com/photo-1596547609652-9cf5d8d8f9e1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    name: "Echeveria",
    category: "Succulents",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 9,
    name: "Haworthia",
    category: "Succulents",
    price: 13,
    image:
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 10,
    name: "Jade Plant",
    category: "Succulents",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 11,
    name: "String of Pearls",
    category: "Succulents",
    price: 17,
    image:
      "https://images.unsplash.com/photo-1532009324734-20a7a5813719?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 12,
    name: "Zebra Haworthia",
    category: "Succulents",
    price: 14,
    image:
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80",
  },

  // Flowering Plants
  {
    id: 13,
    name: "Orchid",
    category: "Flowering Plants",
    price: 28,
    image:
      "https://images.unsplash.com/photo-1567225591450-06036b3392a6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 14,
    name: "African Violet",
    category: "Flowering Plants",
    price: 19,
    image:
      "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 15,
    name: "Anthurium",
    category: "Flowering Plants",
    price: 26,
    image:
      "https://images.unsplash.com/photo-1597848212624-e19c4f3f7f1b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 16,
    name: "Kalanchoe",
    category: "Flowering Plants",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1455582916367-25f75bfc6710?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 17,
    name: "Gerbera Daisy",
    category: "Flowering Plants",
    price: 21,
    image:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 18,
    name: "Begonia",
    category: "Flowering Plants",
    price: 23,
    image:
      "https://images.unsplash.com/photo-1597055181300-d7d8c5b9e5f6?auto=format&fit=crop&w=600&q=80",
  },
];

function ProductList() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const isInCart = (productId) =>
    cartItems.some((item) => item.id === productId);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div className="shop-page">
      <nav className="navbar">
        <div className="brand">
          <span className="brand-icon">🌿</span>
          <span>Paradise Nursery</span>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/plants">Plants</Link>
          <Link to="/cart">
            🛒 Cart ({cartCount})
          </Link>
        </div>
      </nav>

      <main className="product-page">
        <div className="product-header">
          <p className="hero-tagline">Our Collection</p>
          <h1>Paradise Nursery Plants</h1>
          <p>
            Choose from our collection of beautiful indoor plants,
            succulents, and flowering plants.
          </p>
        </div>

        {categories.map((category) => (
          <section className="product-category" key={category}>
            <h2>{category}</h2>

            <div className="product-grid">
              {products
                .filter((product) => product.category === category)
                .map((product) => (
                  <article className="product-card" key={product.id}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />

                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="product-price">${product.price}</p>

                      <button
                        type="button"
                        className="add-cart-btn"
                        onClick={() => handleAddToCart(product)}
                        disabled={isInCart(product.id)}
                      >
                        {isInCart(product.id)
                          ? "Added to Cart"
                          : "Add to Cart"}
                      </button>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;
