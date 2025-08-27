// frontend/pages/cart.js
import { useEffect, useState } from "react";

export default function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // ✅ आपके backend से cart items fetch होंगे
    fetch("https://your-backend.onrender.com/api/cart")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Cart fetch error:", err));
  }, []);

  return (
    <div>
      <h1>Your Cart</h1>
      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.name} – ₹{item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
