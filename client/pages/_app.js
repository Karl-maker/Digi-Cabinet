import "../styles/globals.css";
import Head from "next/head";
import Link from "next/link";

//Components

import { ContextWrapper } from "../components/contextWrapper";

/*

Header Bar with Logo, and Nav will be placed here

Footer Bar with Logo, Contact Info and Links to GitHub Will Be Here

*/

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <meta name="description" content="Student Database Saas" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/icons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
      </Head>
      <body>
        <ContextWrapper Component={Component} pageProps={pageProps} />
      </body>
    </div>
  );
}

export default MyApp;
