// frontend/pages/checkout.js
import { useState } from "react";

export default function Checkout() {
  const [status, setStatus] = useState("");

  const handleCheckout = async () => {
    try {
      // ✅ आपके backend पर checkout API call
      const res = await fetch("https://your-backend.onrender.com/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: "sample order data" }),
      });
      const data = await res.json();
      setStatus("✅ " + data.message);
    } catch (err) {
      setStatus("❌ Checkout failed: " + err.message);
    }
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <button onClick={handleCheckout}>Place Order</button>
      {status && <p>{status}</p>}
    </div>
  );
}
