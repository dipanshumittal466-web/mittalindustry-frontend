
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";

export default function Home(){
  const [items, setItems] = useState([]);
  useEffect(()=>{ fetch("/data/products.json").then(r=>r.json()).then(setItems); }, []);

  return (
    <Layout title="Home">
      <section style={{display:"grid",gridTemplateColumns:"250px 1fr",gap:16}}>
        <aside className="card" style={{padding:12}}>
          <h3>Top Categories</h3>
          <ul>
            {["Inverters","Batteries","LED Bulbs","Ceiling Fans","Stabilizers","Wires & Cables","Sockets & Switches","Extension Boards","Tube Lights","MCB & RCCB","Surge Protectors","Solar Panels"].map(c=>(
              <li key={c}><a href={`/products?cat=${encodeURIComponent(c)}`}>{c}</a></li>
            ))}
          </ul>
        </aside>
        <div>
          <h2>Best Sellers</h2>
          <div className="grid">
            {items.map(p=> <ProductCard key={p.id} p={p}/>)}
          </div>
        </div>
      </section>
      <style jsx>{`
        h3{margin:8px 0}
        ul{list-style:none;padding:0;margin:0;display:grid;gap:6px}
        li a{display:block;padding:8px 10px;border-radius:8px;text-decoration:none;color:#0f172a}
        li a:hover{background:#e2e8f0}
        @media(max-width:900px){ section{grid-template-columns:1fr} }
      `}</style>
    </Layout>
  )
}
