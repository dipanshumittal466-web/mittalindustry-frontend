import Link from 'next/link'
import { useState } from 'react'

export default function Header(){
  const [q,setQ]=useState('')
  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center gap-4 p-3">
        <Link href="/"><a className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-500 rounded flex items-center justify-center text-white font-bold">MI</div>
          <div className="hidden lg:block">
            <div className="text-lg font-semibold">Mittal Industry</div>
            <div className="text-xs text-gray-500">Electrical & Industrial Supplies</div>
          </div>
        </a></Link>

        <div className="hidden lg:flex items-center bg-yellow-100 rounded overflow-hidden flex-1">
          <select className="px-3 border-r bg-transparent text-sm">
            <option>All Categories</option>
            <option>Inverters</option>
            <option>Batteries</option>
            <option>Stabilizers</option>
            <option>MCB & Switches</option>
          </select>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search for products, brands or model numbers" className="flex-1 px-3 py-2 bg-transparent outline-none text-sm"/>
          <button className="px-4 py-2 bg-yellow-400 font-semibold">Search</button>
        </div>

        <div className="flex items-center gap-4 ml-2">
          <div className="text-sm text-gray-700 hidden md:block">Hello, Sign in</div>
          <Link href="/orders"><a className="text-sm hidden md:block">Orders</a></Link>
          <Link href="/cart"><a className="relative">
            <div className="w-10 h-10 rounded flex items-center justify-center border">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7h14l-2-7M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" /></svg>
            </div>
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </a></Link>
        </div>
      </div>

      <nav className="bg-gray-50 border-t border-b">
        <div className="max-w-7xl mx-auto p-2 flex items-center gap-4 text-sm">
          <a className="px-2">All</a>
          <a className="px-2">Home & Kitchen</a>
          <a className="px-2">Industrial</a>
          <a className="px-2">Electrical</a>
          <a className="px-2">Tools</a>
          <a className="px-2 hidden md:inline">Offers</a>
          <a className="px-2 hidden lg:inline">New Arrivals</a>
        </div>
      </nav>
    </header>
  )
}
