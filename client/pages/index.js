import Head from "next/head";
import Search from "../components/body/search";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Digi Cabinet</title>
      </Head>
      <main>
        <div className="search-area">
          <Search />
        </div>
      </main>
    </div>
  );
};
export default Home;
