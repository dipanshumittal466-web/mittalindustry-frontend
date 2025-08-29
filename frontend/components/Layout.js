
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({title, children}){
  return (
    <>
      <Head>
        <title>{title ? `${title} · Mittal Industry` : "Mittal Industry"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Electricals marketplace: inverters, batteries, LED bulbs, fans, stabilizers and more." />
      </Head>
      <Header/>
      <main className="container">
        {children}
      </main>
      <Footer/>
      <style jsx global>{`
        :root{--ink:#0f172a;--muted:#475569;--soft:#f8fafc}
        *{box-sizing:border-box}
        body{margin:0;background:var(--soft);color:var(--ink);font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial}
        .container{max-width:1200px;margin:0 auto;padding:16px}
        .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px}
        .card{background:#fff;border-radius:16px;overflow:hidden;border-top:4px solid #2563eb;box-shadow:0 10px 30px rgba(2,6,23,.08)}
        .card .body{padding:12px}
        .btn{display:inline-block;padding:10px 14px;border-radius:999px;border:1px solid #1d4ed8;font-weight:700;text-decoration:none}
        .btn-primary{background:#2563eb;color:#fff;border-color:#2563eb}
        .btn-outline{background:#fff;color:#2563eb;border-color:#2563eb}
        input,select,textarea{border:1px solid #e5e7eb;border-radius:12px;padding:10px;background:#fff;width:100%}
        label{font-weight:700;color:#64748b;margin:6px 0;display:block}
        table{width:100%;border-collapse:separate;border-spacing:0 10px}
        th,td{padding:10px;text-align:left}
        tbody tr{background:#fff;box-shadow:0 6px 18px rgba(2,6,23,.06)}
        tbody td:first-child{border-radius:12px 0 0 12px}
        tbody td:last-child{border-radius:0 12px 12px 0}
        .pill{display:inline-block;padding:4px 10px;border-radius:999px;background:rgba(37,99,235,.1);color:#1d4ed8;font-weight:700}
      `}</style>
    </>
  )
}
