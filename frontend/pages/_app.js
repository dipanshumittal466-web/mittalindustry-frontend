import '../styles/globals.CSS'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Mittal Industry — Electrical & Industrial Supplies</title>
        <meta name="description" content="Mittal Industry — Inverters, Batteries, LEDs, Fans, Stabilizers, MCBs, Wires & more." />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
