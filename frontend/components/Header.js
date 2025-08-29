
import { useRouter } from "next/router";
import { useState } from "react";

export default function Header(){
  const r = useRouter();
  const [q, setQ] = useState(r.query.q || "");
  const [cat, setCat] = useState(r.query.cat || "");

  function onSearch(e){
    e.preventDefault();
    const params = new URLSearchParams({ q, cat });
    r.push(`/products?${params.toString()}`);
  }

  return (
    <header className="hdr">
      <div className="container topbar">
        <a className="brand" href="/">Mittal<span className="accent">Industry</span></a>
        <form className="searchbar" onSubmit={onSearch}>
          <select value={cat} onChange={e=>setCat(e.target.value)} aria-label="Category">
            <option value="">All</option>
            <option>Inverters</option>
            <option>Batteries</option>
            <option>LED Bulbs</option>
            <option>Ceiling Fans</option>
            <option>Stabilizers</option>
            <option>Wires & Cables</option>
            <option>Sockets & Switches</option>
            <option>Extension Boards</option>
            <option>Tube Lights</option>
            <option>MCB & RCCB</option>
            <option>Surge Protectors</option>
            <option>Solar Panels</option>
          </select>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search electricals, inverters, bulbs, fans…" />
          <button className="btn btn-primary">Search</button>
        </form>
        <nav className="icons">
          <a href="/orders">Orders</a>
          <a href="/login">Login</a>
          <a href="/cart">Cart</a>
        </nav>
      </div>
      <div className="container navlinks">
        <a href="/products">Products</a>
        <a href="/about">About</a>
        <a href="/services">Services</a>
        <a href="/contact">Contact</a>
      </div>

      <style jsx>{`
        .container{max-width:1200px;margin:0 auto;padding:0 16px}
        .hdr{position:sticky;top:0;z-index:50;background:linear-gradient(90deg,#2563eb,#1d4ed8);box-shadow:0 10px 30px rgba(2,6,23,.2)}
        .topbar{display:grid;grid-template-columns:200px 1fr 240px;gap:12px;align-items:center;padding:12px 0}
        .brand{font-weight:900;font-size:22px;color:white;text-decoration:none}
        .accent{color:#fde68a}
        .searchbar{display:flex;gap:8px}
        .searchbar input{flex:1;padding:10px 12px;border-radius:10px;border:1px solid #cbd5e1}
        .searchbar select{width:160px;border-radius:10px;border:1px solid #cbd5e1;padding:10px}
        .btn{padding:10px 14px;border-radius:999px;border:1px solid #1d4ed8;font-weight:700}
        .btn-primary{background:#0ea5e9;color:white;border-color:#0ea5e9}
        .icons{display:flex;gap:10px;justify-content:flex-end}
        .icons a{color:#e2e8f0;background:rgba(255,255,255,.12);padding:8px 10px;border-radius:8px;text-decoration:none;border:1px solid rgba(255,255,255,.2)}
        .icons a:hover{background:rgba(255,255,255,.2)}
        .navlinks{display:flex;gap:8px;padding:8px 0 12px}
        .navlinks a{color:#0f172a;text-decoration:none;padding:6px 10px;border-radius:8px}
        .navlinks a:hover{background:#e2e8f0}
        @media(max-width:900px){ .topbar{grid-template-columns:1fr} .icons{justify-content:flex-start} .searchbar select{display:none} }
      `}</style>
    </header>
  )
}
