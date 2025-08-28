import Link from 'next/link'

export default function ProductCard({p}){
  return (
    <article className="bg-white shadow-sm rounded p-3 flex flex-col">
      <div className="h-40 flex items-center justify-center bg-gray-50 rounded overflow-hidden">
        {p.image ? <img src={p.image} alt={p.title} className="max-h-full"/> : <div className="text-gray-400">No image</div>}
      </div>
      <h3 className="mt-3 text-sm font-medium line-clamp-2">{p.title}</h3>
      <div className="text-xs text-gray-500 mt-1">Brand: {p.brand}</div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">₹{p.price}</div>
          <div className="text-xs text-gray-500">Inclusive of all taxes</div>
        </div>
        <Link href={`/product/${p.id}`}><a className="text-sm px-3 py-1 border rounded">View</a></Link>
      </div>
    </article>
  )
}
