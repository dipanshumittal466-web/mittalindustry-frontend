import Header from '../../components/Header'
import { useRouter } from 'next/router'

export default function BlogDetail({blog}){
  if(!blog) return <div><Header /><main className="max-w-4xl mx-auto p-4">Article not found</main></div>
  return (
    <div>
      <Header />
      <main className="max-w-4xl mx-auto p-4 bg-white rounded shadow">
        <h1 className="text-2xl font-semibold">{blog.title}</h1>
        <div className="text-sm text-gray-500 mb-4">Published on: {new Date(blog.createdAt).toLocaleDateString()}</div>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} className="prose" />
      </main>
    </div>
  )
}

export async function getServerSideProps(ctx){
  const slug = ctx.params.slug;
  const res = await fetch(process.env.BACKEND_URL ? process.env.BACKEND_URL + '/api/blogs/'+slug : 'http://localhost:4000/api/blogs/'+slug);
  if(res.status !== 200) return { props: { blog: null } };
  const blog = await res.json();
  return { props: { blog } };
}
