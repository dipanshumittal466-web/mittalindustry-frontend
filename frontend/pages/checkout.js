import Header from '../components/Header'

export default function Checkout(){
  return (
    <div>
      <Header />
      <main className="max-w-4xl mx-auto p-4">
        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="text-xl font-semibold">Checkout</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium">Shipping address</h4>
              <div className="mt-2 text-sm text-gray-600">No addresses saved.</div>
            </div>
            <div>
              <h4 className="font-medium">Payment</h4>
              <div className="mt-2 text-sm text-gray-600">Razorpay / Card / UPI integration (not wired in demo).</div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button className="px-4 py-2 bg-yellow-400 rounded font-semibold">Place your order</button>
          </div>
        </div>
      </main>
    </div>
  )
}
