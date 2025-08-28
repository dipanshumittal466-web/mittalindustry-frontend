export default function Register() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Register</h1>
      <form className="flex flex-col gap-3 mt-4">
        <input type="text" placeholder="Full Name" className="border p-2 rounded" />
        <input type="email" placeholder="Email" className="border p-2 rounded" />
        <input type="password" placeholder="Password" className="border p-2 rounded" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  )
}