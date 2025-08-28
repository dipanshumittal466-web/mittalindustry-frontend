import Header from './components/Header'
import products from './data/products.json'
import Link from 'next/link'

export default function Cart(){
  // This is a mock cart view (static) for demo purposes
  const items = [products[0], products[1]]
  const subtotal = items.reduce((s,i)=>s+i.price,0)
  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
            <div className="space-y-4">
              {items.map(it => <div key={it.id} className="bg-white p-4 rounded shadow-sm flex gap-4">
                <div className="w-24 h-24 bg-gray-50 flex items-center justify-center">{it.image ? <img src={it.image} alt={it.title} className="max-h-full"/> : 'Img'}</div>
                <div className="flex-1">
                  <div className="font-medium">{it.title}</div>
                  <div className="text-sm text-gray-600">Brand: {it.brand}</div>
                  <div className="mt-2">Qty: 1</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₹{it.price}</div>
                </div>
              </div>)}
            </div>
          </section>

          <aside className="bg-white p-4 rounded shadow-sm">
            <div className="text-sm text-gray-600">Order Summary</div>
            <div className="mt-2 text-2xl font-bold">₹{subtotal}</div>
            <div className="mt-4">
              <Link href="/checkout"><a className="block w-full text-center px-4 py-2 bg-yellow-400 rounded font-semibold">Proceed to Buy</a></Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
