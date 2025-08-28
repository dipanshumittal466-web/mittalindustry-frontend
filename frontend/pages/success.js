export default function Success() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful 🎉</h1>
      <p className="mt-4">Thank you for your purchase. Your order has been confirmed.</p>
      <a href="/orders" className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded">
        View Orders
      </a>
    </div>
  )
}