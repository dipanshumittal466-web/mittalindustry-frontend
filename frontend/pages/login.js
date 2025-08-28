export default function Login() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Login</h1>
      <form className="flex flex-col gap-3 mt-4">
        <input type="email" placeholder="Email" className="border p-2 rounded" />
        <input type="password" placeholder="Password" className="border p-2 rounded" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  )
}