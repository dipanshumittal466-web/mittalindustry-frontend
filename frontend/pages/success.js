
import Layout from "../components/Layout";
import { getOrders } from "../lib/store";
import { useEffect, useState } from "react";

export default function Success(){
  const [order, setOrder] = useState(null);
  useEffect(()=>{
    const list = getOrders();
    if(list.length) setOrder(list[list.length-1]);
  }, []);

  return (
    <Layout title="Order Success">
      <h2>Success</h2>
      {!order ? <p>Order placed.</p> : (
        <>
          <p>{order.payment==="cod" ? "Order placed with Cash on Delivery. Pay at delivery." : "Order placed with Online Payment (Demo)."}</p>
          <p>Total: <b>₹{order.total.toLocaleString()}</b></p>
          <a className="btn btn-outline" href="/orders">Go to Orders</a>
        </>
      )}
    </Layout>
  )
}
