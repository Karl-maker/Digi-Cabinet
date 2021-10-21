import { createContext, useEffect, useState } from "react";
import { isLoggedIn } from "../api/auth";

//Components

import Header from "../components/body/header";
import Footer from "../components/body/footer";

/*

Header Bar with Logo, and Nav will be placed here

Footer Bar with Logo, Contact Info and Links to GitHub Will Be Here

*/

var AccountContext;

function ContextWrapper({ Component, pageProps }) {
  const [user, setUser] = useState({
    email: null,
    first_name: null,
    last_name: null,
    isLoggedIn: false,
  });
  AccountContext = createContext(user);

  //Run Once On Mount

  useEffect(async () => {
    await isLoggedIn()
      .then((user) => {
        console.log(user);
        setUser({ ...user, isLoggedIn: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <AccountContext.Provider value={user}>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </AccountContext.Provider>
  );
}

export { ContextWrapper, AccountContext };
