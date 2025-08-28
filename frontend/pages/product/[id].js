import { useRouter } from 'next/router'
import Header from '../../components/Header'
import products from '../../data/products.json'
import ProductCard from '../../components/ProductCard'

export default function ProductPage(){
  const router = useRouter()
  const { id } = router.query
  const p = products.find(x => String(x.id) === String(id)) || products[0]

  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-center bg-gray-50 rounded p-4">
                  {p.image ? <img src={p.image} alt={p.title} className="max-h-80"/> : <div className="text-gray-400">No image</div>}
                </div>
                <div>
                  <h1 className="text-2xl font-semibold">{p.title}</h1>
                  <div className="text-sm text-gray-600 mt-1">Brand: {p.brand}</div>
                  <div className="mt-4 text-3xl font-bold">₹{p.price}</div>
                  <div className="mt-2 text-sm text-gray-500">Inclusive of all taxes</div>

                  <div className="mt-4 flex gap-3">
                    <button className="px-4 py-2 bg-yellow-400 font-semibold rounded">Buy Now</button>
                    <button className="px-4 py-2 border rounded">Add to Cart</button>
                  </div>

                  <div className="mt-6">
                    <div className="text-sm font-medium">Available offers</div>
                    <ul className="text-sm text-gray-600 list-disc ml-5 mt-2">
                      <li>No-cost EMI available on select cards</li>
                      <li>Bank offer: 5% cashback with XYZ Bank</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-white p-4 rounded shadow-sm">
              <div className="border-b pb-2 mb-4">
                <h3 className="text-lg font-semibold">Product Details</h3>
              </div>
              <div>
                <div className="mb-4">
                  <h4 className="font-medium">Description</h4>
                  <p className="text-sm text-gray-700 mt-2">{p.description || 'No description available.'}</p>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium">Specifications</h4>
                  <table className="text-sm w-full">
                    <tbody>
                      <tr><td className="py-1 text-gray-600">Model</td><td className="py-1">{p.model || '-'}</td></tr>
                      <tr><td className="py-1 text-gray-600">Warranty</td><td className="py-1">{p.warranty || '1 year'}</td></tr>
                      <tr><td className="py-1 text-gray-600">Weight</td><td className="py-1">{p.weight || '-'}</td></tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h4 className="font-medium">Customer reviews</h4>
                  <div className="mt-2 text-sm text-gray-600">No reviews yet.</div>
                </div>
              </div>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="bg-white p-4 rounded shadow-sm sticky top-24">
              <div className="text-sm text-gray-600">Best Price</div>
              <div className="text-2xl font-bold mt-2">₹{p.price}</div>
              <div className="mt-4">
                <button className="w-full px-4 py-2 bg-yellow-400 rounded font-semibold">Buy Now</button>
                <button className="w-full mt-2 px-4 py-2 border rounded">Add to Cart</button>
              </div>
              <div className="mt-4 text-sm text-gray-600">Delivery in 3-5 business days</div>
            </div>

            <div className="bg-white p-4 rounded shadow-sm mt-4">
              <h4 className="font-semibold">Frequently bought together</h4>
              <div className="mt-3 space-y-2">
                {products.slice(1,4).map(pr => <div key={pr.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-50 flex items-center justify-center">{pr.image ? <img src={pr.image} alt="" className="max-h-full"/> : 'Img'}</div>
                  <div className="text-sm">{pr.title}</div>
                </div>)}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
