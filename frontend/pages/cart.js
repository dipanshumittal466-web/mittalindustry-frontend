import Header from '../components/Header'
export default function Cart(){
  return (
    <div>
      <Header />
      <main className="max-w-4xl mx-auto p-4">
        <h2 className="text-xl font-semibold">Your cart</h2>
        <div className="card mt-4">Cart is empty — this is a placeholder. Implement cart state with React Context or server-side session.</div>
      </main>
    </div>
  )
}
