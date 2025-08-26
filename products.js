import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE || "https://your-backend.onrender.com"}/products`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <h1>Our Products</h1>
      <ul>
        {products.map((p, i) => (
          <li key={i}>{p.name} - ₹{p.price}</li>
        ))}
      </ul>
    </div>
  );
}
