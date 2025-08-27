import Header from '../components/Header'
export default function Checkout(){
  return (
    <div>
      <Header />
      <main className="max-w-4xl mx-auto p-4">
        <h2 className="text-xl font-semibold">Checkout</h2>
        <div className="card mt-4">This page will be wired to Razorpay in the server API route (test mode). Add address form and payment summary here.</div>
      </main>
    </div>
  )
}
