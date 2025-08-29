
import Layout from "../components/Layout";
import { setUser } from "../lib/store";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Register(){
  const r = useRouter();
  const [form, setForm] = useState({name:"",email:"",pass:""});
  function submit(e){ e.preventDefault(); setUser({name:form.name,email:form.email}); r.push("/"); }
  return (
    <Layout title="Register">
      <div className="card" style={{maxWidth:420,margin:"24px auto",padding:16}}>
        <h2 style={{marginTop:0}}>Create Account</h2>
        <form onSubmit={submit}>
          <label>Name</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <label>Email</label><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
          <label>Password</label><input type="password" value={form.pass} onChange={e=>setForm({...form,pass:e.target.value})}/>
          <button className="btn btn-primary" style={{width:"100%",marginTop:12}}>Register</button>
        </form>
      </div>
    </Layout>
  )
}
