import { useContext } from "react";
import Router from "next/router";
import { isLoggedIn } from "../../api/auth";
import { AccountContext } from "../../components/state-machines/authStateProvider";
import { useActor } from "@xstate/react";

const login = "/login?redirected=true"; // Define your login route address.

export default (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async (context_data) => {
    const data = useContext(AccountContext);
    const [state] = useActor(data.authService);
    const { info: context } = state;
    const userAuth = state.matches("private");
    // Are you an authorized user or not?
    if (!userAuth) {
      // Handle server-side and client-side rendering.
      if (context_data.res) {
        context_data.res?.writeHead(302, {
          Location: login,
        });
        context_data.res?.end();
      } else {
        Router.replace(login);
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({
        ...context_data,
        auth: userAuth,
      });
      return { ...wrappedProps, userAuth };
    }

    return { userAuth };
  };

  return hocComponent;
};
