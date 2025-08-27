import { useRouter } from 'next/router'
import Header from '../../components/Header'
import products from '../../data/products.json'
import Link from 'next/link'

export default function ProductPage(){
  const router = useRouter()
  const { id } = router.query
  const p = products.find(x => x.id === id) || products[0]
  return (
    <div>
      <Header />
      <main className="max-w-4xl mx-auto p-4">
        <div className="card flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 thumb">Product Image</div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold">{p.title}</h1>
            <div className="text-sm text-gray-500">Brand: {p.brand}</div>
            <div className="mt-4 text-2xl font-bold">₹{p.price}</div>
            <p className="mt-4 text-gray-700">High quality product suitable for domestic and commercial usage. Replace this text with your product description.</p>
            <div className="mt-6 flex gap-3">
              <button className="btn-primary">Buy now</button>
              <Link href="/cart"><a className="px-3 py-2 border rounded">Add to cart</a></Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
