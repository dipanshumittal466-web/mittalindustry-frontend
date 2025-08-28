import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import products from '../data/products.json'

export default function Home(){
  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto p-4">
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <div className="bg-white p-4 shadow-sm rounded">
              <h4 className="font-semibold">Browse by Category</h4>
              <ul className="mt-3 text-sm text-gray-600 space-y-2">
                <li className="hover:text-blue-600 cursor-pointer">Batteries</li>
                <li className="hover:text-blue-600 cursor-pointer">Inverters</li>
                <li className="hover:text-blue-600 cursor-pointer">Stabilizers</li>
                <li className="hover:text-blue-600 cursor-pointer">MCB & Socket</li>
                <li className="hover:text-blue-600 cursor-pointer">Cables & Wires</li>
              </ul>
            </div>

            <div className="bg-white p-4 shadow-sm rounded mt-4">
              <h4 className="font-semibold">Filter by</h4>
              <div className="mt-2 text-sm text-gray-600">
                <div className="mb-2">Price</div>
                <div className="flex gap-2"><button className="px-2 py-1 border rounded text-xs">Under ₹1,000</button><button className="px-2 py-1 border rounded text-xs">₹1k-5k</button></div>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-3">
            <div className="bg-white p-4 shadow-sm rounded mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Featured products</h2>
                <div className="text-sm text-gray-500">Top deals updated daily</div>
              </div>
              <div className="text-sm">Showing {products.length} results</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(p => <ProductCard key={p.id} p={p} />)}
            </div>
          </section>
        </section>
      </main>
    </div>
  )
}
