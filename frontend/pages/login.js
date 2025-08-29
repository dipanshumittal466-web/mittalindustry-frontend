
import Layout from "../components/Layout";
import { setUser } from "../lib/store";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login(){
  const r = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function submit(e){
    e.preventDefault();
    setUser({email});
    r.push("/");
  }

  return (
    <Layout title="Login">
      <div className="card" style={{maxWidth:420,margin:"24px auto",padding:16}}>
        <h2 style={{marginTop:0}}>Login</h2>
        <form onSubmit={submit}>
          <label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)}/>
          <label>Password</label><input type="password" value={pass} onChange={e=>setPass(e.target.value)}/>
          <button className="btn btn-primary" style={{width:"100%",marginTop:12}}>Login</button>
          <div style={{marginTop:8,fontSize:14}}>New here? <a href="/register">Create an account</a></div>
        </form>
      </div>
    </Layout>
  )
}
