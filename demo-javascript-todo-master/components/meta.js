import Head from 'next/head'

const metaDescription =
  'Rapid.io is a flexible realtime database accessible from a client-side code. Go realtime using rich queries, auto indexing and flexible security. Download our SDKs for iOS, Android and JavaScript on www.rapid.io. Start for free.'
export default () =>
  <div>
    <Head>
      <title>RapiDO - Demo App of Rapid.io</title>
      <meta name="description" content={metaDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/favicon-16x16.png"
      />
      <link rel="manifest" href="/static/manifest.json" />
      <link
        rel="mask-icon"
        href="/static/safari-pinned-tab.svg"
        color="#1d1b2e"
      />
      <meta name="theme-color" content="#ffffff" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="Rapid.io Demo App" />
      <meta property="og:url" content="https://www.rapid.io" />
      <meta property="og:image" content="/static/banner.png" />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <link
        href="https://fonts.googleapis.com/css?family=Poppins:400,600"
        rel="stylesheet"
      />
    </Head>
    <style jsx global>{`
      html {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscaled;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        text-size-adjust: 100%;
        text-rendering: optimizeLegibility;
        font-size: 62.5%;
      }
      body {
        font-family: 'Poppins', sans-serif;
        background: #fff;
        font-size: 1.4rem;
        color: #242A49;
      }
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-weight: 400;
      }
    `}</style>
  </div>
