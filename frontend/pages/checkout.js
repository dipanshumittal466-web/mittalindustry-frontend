
import Layout from "../components/Layout";
import { placeOrder } from "../lib/store";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Checkout(){
  const r = useRouter();
  const [addr, setAddr] = useState({name:"",phone:"",email:"",street:"",city:"",pin:""});
  const [payment, setPayment] = useState("cod");

  function submit(e){
    e.preventDefault();
    const o = placeOrder({payment, address:addr});
    r.push(`/success?id=${o.id}`);
  }

  return (
    <Layout title="Checkout">
      <h2>Checkout</h2>
      <form onSubmit={submit} className="grid2">
        <div>
          <label>Name</label><input value={addr.name} onChange={e=>setAddr({...addr,name:e.target.value})}/>
          <label>Phone</label><input value={addr.phone} onChange={e=>setAddr({...addr,phone:e.target.value})}/>
          <label>Email</label><input value={addr.email} onChange={e=>setAddr({...addr,email:e.target.value})}/>
          <label>Street</label><input value={addr.street} onChange={e=>setAddr({...addr,street:e.target.value})}/>
          <label>City</label><input value={addr.city} onChange={e=>setAddr({...addr,city:e.target.value})}/>
          <label>PIN</label><input value={addr.pin} onChange={e=>setAddr({...addr,pin:e.target.value})}/>
        </div>
        <div>
          <div className="card" style={{padding:12}}>
            <div style={{fontWeight:800,fontSize:18,marginBottom:8}}>Payment Method</div>
            <label><input type="radio" name="pay" checked={payment==="cod"} onChange={()=>setPayment("cod")}/> Cash on Delivery</label>
            <label style={{marginLeft:12}}><input type="radio" name="pay" checked={payment==="online"} onChange={()=>setPayment("online")}/> UPI / Card (Demo)</label>
            <button className="btn btn-primary" style={{display:"block",width:"100%",marginTop:12}}>Place Order</button>
          </div>
        </div>
      </form>
      <style jsx>{`
        .grid2{display:grid;grid-template-columns:1fr 320px;gap:16px}
        @media(max-width:900px){ .grid2{grid-template-columns:1fr} }
      `}</style>
    </Layout>
  )
}
