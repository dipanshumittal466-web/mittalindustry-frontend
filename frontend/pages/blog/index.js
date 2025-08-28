import Link from 'next/link'
import Header from '../../components/Header'

export default function BlogIndex({blogs}){
  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Articles & Guides</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blogs.map(b => (
            <article key={b.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-medium"><Link href={'/blog/'+b.slug}><a>{b.title}</a></Link></h2>
              <p className="text-sm text-gray-600 mt-2">{b.excerpt}</p>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps(){
  const res = await fetch(process.env.BACKEND_URL ? process.env.BACKEND_URL + '/api/blogs' : 'http://localhost:4000/api/blogs');
  const blogs = await res.json();
  return { props: { blogs } };
}
