
import Layout from "../components/Layout";
import { getOrders } from "../lib/store";
import { useEffect, useState } from "react";

export default function Orders(){
  const [orders, setOrders] = useState([]);
  useEffect(()=>{ setOrders(getOrders().slice().reverse()); }, []);

  return (
    <Layout title="Your Orders">
      <h2>Your Orders</h2>
      {orders.length===0 ? <p>No orders yet.</p> : (
        <table>
          <thead><tr><th>ID</th><th>Items</th><th>Total</th><th>Status</th><th>Payment</th><th>Date</th></tr></thead>
          <tbody>
            {orders.map(o=>{
              const items = o.items.map(i=>`${i.name} × ${i.qty}`).join(", ");
              return (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{items}</td>
                  <td>₹{o.total.toLocaleString()}</td>
                  <td><span className="pill">{o.status}</span></td>
                  <td><span className="pill">{o.payment==="cod"?"Pending (COD)":"Paid (Online)"}</span></td>
                  <td>{new Date(o.createdAt).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Layout>
  )
}
