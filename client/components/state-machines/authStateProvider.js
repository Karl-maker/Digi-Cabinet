import React, { createContext, useState, useEffect } from "react";
import { useInterpret, useMachine } from "@xstate/react";
import { authMachine } from "./authMachine";
import { isLoggedIn as Login } from "../../api/auth";
import Header from "../body/header";
import Footer from "../body/footer";

export const AccountContext = createContext({});

export const AuthStateProvider = ({ Component, pageProps }) => {
  const [state, send] = useMachine(authMachine);
  const authService = useInterpret(authMachine);

  return (
    <AccountContext.Provider value={{ authService }}>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </AccountContext.Provider>
  );
};
