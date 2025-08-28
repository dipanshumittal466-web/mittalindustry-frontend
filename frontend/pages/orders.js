export default function Orders() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">My Orders</h1>
      <ul className="mt-4 list-disc pl-6">
        <li>Order #1001 - Pending</li>
        <li>Order #1002 - Shipped</li>
        <li>Order #1003 - Delivered</li>
      </ul>
    </div>
  )
}