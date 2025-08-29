// pages/_app.js
import "../styles/globals.css";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Mittal Industry – Electrical E-Commerce</title>
        <meta
          name="description"
          content="Buy inverters, batteries, LED lights, fans, stabilizers, wires, sockets and more from Mittal Industry. Cash on Delivery available."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Layout */}
      <div className="min-h-screen flex flex-col">
        {/* Header (Amazon style) */}
        <header className="bg-[#131921] text-white flex items-center justify-between p-4">
          <a href="/" className="text-xl font-bold">
            Mittal Industry
          </a>

          {/* Search Bar */}
          <div className="search-bar flex flex-1 mx-6">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 p-2"
            />
            <button>Search</button>
          </div>

          {/* Nav */}
          <nav className="space-x-4 font-medium">
            <a href="/products">Products</a>
            <a href="/about">About</a>
            <a href="/services">Services</a>
            <a href="/contact">Contact</a>
            <a href="/cart">Cart</a>
          </nav>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          <Component {...pageProps} />
        </main>

        {/* Footer */}
        <footer className="bg-[#131921] text-white text-center p-4">
          © {new Date().getFullYear()} Mittal Industry – All rights reserved.
        </footer>
      </div>
    </>
  );
}
