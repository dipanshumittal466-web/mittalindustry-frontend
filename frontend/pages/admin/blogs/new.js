import { useState } from 'react'
import Header from '../../components/Header'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

export default function NewBlog(){
  const [title,setTitle]=useState('')
  const [slug,setSlug]=useState('')
  const [content,setContent]=useState('')
  const [excerpt,setExcerpt]=useState('')
  const [published,setPublished]=useState(true)

  async function save(){
    const res = await fetch('/api/admin/blogs', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ title, slug, content, excerpt, published }) })
    if(res.ok) alert('Saved'); else alert('Error');
  }

  return (
    <div>
      <Header />
      <main className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">New Article</h1>
        <div className="bg-white p-4 rounded shadow">
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full border p-2 mb-2" />
          <input value={slug} onChange={e=>setSlug(e.target.value)} placeholder="Slug (url-friendly)" className="w-full border p-2 mb-2" />
          <input value={excerpt} onChange={e=>setExcerpt(e.target.value)} placeholder="Excerpt" className="w-full border p-2 mb-2" />
          <ReactQuill value={content} onChange={setContent} />
          <div className="mt-3 flex items-center gap-3">
            <label><input type="checkbox" checked={published} onChange={e=>setPublished(e.target.checked)} /> Publish</label>
            <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          </div>
        </div>
      </main>
    </div>
  )
}
