
export default function Footer(){
  return (
    <footer className="ftr">
      <div className="container">
        <div>© {new Date().getFullYear()} Mittal Industry</div>
        <div>WhatsApp: <a href="https://wa.me/917668420528">7668420528</a> · Email: <a href="mailto:dipanshumittal@example.com">Dipanshu Mittal</a></div>
      </div>
      <style jsx>{`
        .container{max-width:1200px;margin:0 auto;padding:0 16px}
        .ftr{background:#0b1220;color:#cbd5e1;padding:24px 0;margin-top:24px}
        a{color:#93c5fd}
      `}</style>
    </footer>
  )
}
