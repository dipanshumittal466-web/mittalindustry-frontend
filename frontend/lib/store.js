
// LocalStorage-based demo store (cart, orders, user)
export const CART_KEY = "mi_cart_v1";
export const ORDERS_KEY = "mi_orders_v1";
export const USER_KEY = "mi_user_v1";

export function getCart(){ if (typeof window==="undefined") return []; try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch(e){ return []; } }
export function setCart(c){ if (typeof window==="undefined") return; localStorage.setItem(CART_KEY, JSON.stringify(c)); }
export function addToCart(item){
  const cart = getCart();
  const found = cart.find(i=>i.id===item.id);
  if(found) found.qty += (item.qty||1); else cart.push({...item, qty:item.qty||1});
  setCart(cart);
}
export function removeFromCart(id){ setCart(getCart().filter(i=>i.id!==id)); }
export function updateQty(id, qty){
  const cart = getCart().map(i=> i.id===id ? {...i, qty: Math.max(1, qty)} : i);
  setCart(cart);
}
export function cartTotal(){ return getCart().reduce((s,i)=> s + i.price * i.qty, 0); }

export function getOrders(){ if (typeof window==="undefined") return []; try { return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]"); } catch(e){ return []; } }
export function placeOrder(order){
  const orders = getOrders();
  const o = {
    id: Date.now(),
    items: getCart(),
    total: cartTotal(),
    payment: order?.payment || "cod",
    address: order?.address || {},
    status: "Processing",
    createdAt: new Date().toISOString()
  };
  orders.push(o);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  setCart([]);
  return o;
}

export function getUser(){ try{ return JSON.parse(localStorage.getItem(USER_KEY) || "null"); } catch(e){ return null; } }
export function setUser(u){ localStorage.setItem(USER_KEY, JSON.stringify(u)); }
