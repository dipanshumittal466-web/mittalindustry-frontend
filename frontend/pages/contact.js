
import Layout from "../components/Layout";

export default function Contact(){
  return (
    <Layout title="Contact">
      <h2>Contact Us</h2>
      <p>WhatsApp: <a href="https://wa.me/917668420528">7668420528</a></p>
      <p>Email: Dipanshu Mittal</p>
      <form className="card" style={{padding:12,maxWidth:560}} onSubmit={(e)=>{e.preventDefault(); alert("Message sent!");}}>
        <label>Name</label><input/>
        <label>Phone</label><input/>
        <label>Message</label><textarea rows="4"/>
        <button className="btn btn-primary" style={{marginTop:8}}>Send</button>
      </form>
    </Layout>
  )
}
