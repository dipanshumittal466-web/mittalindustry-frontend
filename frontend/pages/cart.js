
import Layout from "../components/Layout";
import { getCart, removeFromCart, updateQty, cartTotal } from "../lib/store";
import { useEffect, useState } from "react";

export default function Cart(){
  const [cart, setCart] = useState([]);
  useEffect(()=>{ setCart(getCart()); }, []);
  function refresh(){ setCart(getCart()); }

  return (
    <Layout title="Cart">
      <h2>Your Cart</h2>
      {cart.length===0 ? <p>Cart is empty.</p> : (
        <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:16}}>
          <table>
            <thead><tr><th>Item</th><th>Price</th><th>Qty</th><th>Subtotal</th><th/></tr></thead>
            <tbody>
              {cart.map(i=>(
                <tr key={i.id}>
                  <td>{i.name}</td>
                  <td>₹{i.price.toLocaleString()}</td>
                  <td><input type="number" min="1" value={i.qty} onChange={e=>{updateQty(i.id, parseInt(e.target.value||"1")); refresh();}}/></td>
                  <td>₹{(i.price*i.qty).toLocaleString()}</td>
                  <td><button className="btn btn-outline" onClick={()=>{removeFromCart(i.id); refresh();}}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="card" style={{padding:12}}>
            <div style={{fontWeight:800,fontSize:18}}>Summary</div>
            <div style={{margin:"8px 0"}}>Total: <b>₹{cartTotal().toLocaleString()}</b></div>
            <a href="/checkout" className="btn btn-primary" style={{display:"block",textAlign:"center"}}>Checkout</a>
          </div>
        </div>
      )}
    </Layout>
  )
}
