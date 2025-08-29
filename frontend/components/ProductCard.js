
import { addToCart } from "../lib/store";

export default function ProductCard({p}){
  return (
    <a className="card" href={`/products?id=${p.id}`}>
      <img src={p.image} alt={p.name} style={{width:"100%",aspectRatio:"4/3",objectFit:"cover"}} loading="lazy"/>
      <div className="body">
        <div style={{fontSize:12,color:"#64748b"}}>{p.category}</div>
        <div style={{fontWeight:700}}>{p.name}</div>
        <div className="stars">★★★★★ <span style={{fontSize:12,color:"#64748b"}}>({p.rating})</span></div>
        <div className="price" style={{fontWeight:800,marginTop:4}}>₹{p.price.toLocaleString()}</div>
        <p style={{fontSize:14,color:"#475569"}}>{p.short}</p>
        <button className="btn btn-primary" onClick={(e)=>{e.preventDefault(); addToCart({id:p.id,name:p.name,price:p.price}); alert("Added to cart");}}>Add to Cart</button>
      </div>
    </a>
  )
}
