
import Layout from "../components/Layout";
import API_URL from "../config";   // ✅ config.js import
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Products(){
  const r = useRouter();
  const { q = "", cat = "" } = r.query;
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState({min:"", max:"", rating:""});
  const [sort, setSort] = useState("");

  useEffect(()=>{ fetch("/data/products.json").then(r=>r.json()).then(setItems); }, []);

  const cats = Array.from(new Set(items.map(p=>p.category)));

  function applyFilters(){
    let list = items.slice();
    if(q) list = list.filter(p => (p.name+" "+p.short+" "+p.category).toLowerCase().includes(String(q).toLowerCase()));
    if(cat) list = list.filter(p => p.category===cat);
    const lo = parseFloat(filter.min)||0;
    const hi = parseFloat(filter.max)||Infinity;
    list = list.filter(p => p.price>=lo && p.price<=hi);
    if(filter.rating==="4.5") list = list.filter(p=>p.rating>=4.5);
    if(filter.rating==="4.0") list = list.filter(p=>p.rating>=4.0);
    switch(sort){
      case "price-asc": list.sort((a,b)=>a.price-b.price); break;
      case "price-desc": list.sort((a,b)=>b.price-a.price); break;
      case "rating-desc": list.sort((a,b)=>b.rating-a.rating); break;
    }
    return list;
  }

  const list = applyFilters();

  return (
    <Layout title="Products">
      <div className="layout">
        <aside className="card" style={{padding:12}}>
          <h3>Filters</h3>
          <label>Category</label>
          <select value={cat} onChange={e=> r.push(`/products?cat=${encodeURIComponent(e.target.value)}&q=${encodeURIComponent(q)}`)}>
            <option value="">All</option>
            {cats.map(c=> <option key={c}>{c}</option>)}
          </select>
          <label>Price (₹)</label>
          <div style={{display:"flex",gap:8}}>
            <input placeholder="Min" type="number" value={filter.min} onChange={e=>setFilter({...filter,min:e.target.value})}/>
            <input placeholder="Max" type="number" value={filter.max} onChange={e=>setFilter({...filter,max:e.target.value})}/>
          </div>
          <label>Rating</label>
          <select value={filter.rating} onChange={e=>setFilter({...filter,rating:e.target.value})}>
            <option value="">Any</option>
            <option value="4.5">4.5★ & up</option>
            <option value="4.0">4.0★ & up</option>
          </select>
          <button className="btn btn-outline" onClick={()=>{setFilter({min:"",max:"",rating:""}); r.push("/products");}}>Clear</button>
        </aside>
        <section>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div>{list.length} results {cat? `in ${cat}`:""}</div>
            <div>
              <label style={{display:"inline-block",marginRight:8}}>Sort</label>
              <select value={sort} onChange={e=>setSort(e.target.value)}>
                <option value="">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating</option>
              </select>
            </div>
          </div>
          <div className="grid">
            {list.map(p=> <ProductCard key={p.id} p={p}/>)}
          </div>
        </section>
      </div>
      <style jsx>{`
        .layout{display:grid;grid-template-columns:260px 1fr;gap:16px}
        @media(max-width:900px){ .layout{grid-template-columns:1fr} }
      `}</style>
    </Layout>
  )
}
