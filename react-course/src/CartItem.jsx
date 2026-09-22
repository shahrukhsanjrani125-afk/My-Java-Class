import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeItem, updateQuantity } from "./CartSlice";

function CartItem() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const increaseQuantity = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const decreaseQuantity = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity - 1,
      })
    );
  };

  const deleteItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

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
            🛒 Cart ({totalItems})
          </Link>
        </div>
      </nav>

      <main className="cart-page">
        <div className="cart-header">
          <p className="hero-tagline">Your Selection</p>
          <h1>Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>
              You have not added any plants to your shopping cart yet.
            </p>

            <Link className="continue-shopping-btn" to="/plants">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => {
                const itemTotal = item.price * item.quantity;

                return (
                  <article className="cart-item" key={item.id}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />

                    <div className="cart-item-details">
                      <h2>{item.name}</h2>
                      <p className="cart-category">{item.category}</p>
                      <p>
                        Unit Price: <strong>${item.price}</strong>
                      </p>
                    </div>

                    <div className="quantity-control">
                      <span>Quantity</span>

                      <div className="quantity-buttons">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item)}
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>

                        <strong>{item.quantity}</strong>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item)}
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="item-total">
                      <span>Total</span>
                      <strong>${itemTotal.toFixed(2)}</strong>
                    </div>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete
                    </button>
                  </article>
                );
              })}
            </div>

            <div className="cart-summary">
              <div>
                <span>Total Items:</span>
                <strong>{totalItems}</strong>
              </div>

              <div className="grand-total">
                <span>Total Amount:</span>
                <strong>${totalAmount.toFixed(2)}</strong>
              </div>

              <div className="cart-actions">
                <Link className="continue-shopping-btn" to="/plants">
                  Continue Shopping
                </Link>

                <button
                  type="button"
                  className="checkout-btn"
                  onClick={() => alert("Checkout Coming Soon!")}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default CartItem;
