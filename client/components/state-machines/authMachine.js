import { createMachine, assign } from "xstate";
import { isLoggedIn as authenticateUser } from "../../api/auth";

/*

This will allow for smooth control of the authentication. 
After a user sends credentials and gets tokens, 
LOGIN will be triggered right after to authenticate user again and then set the context

*/

export const authMachine = createMachine(
  {
    id: "authentication",
    initial: "init",
    context: {
      user: {},
      error: {},
    },
    states: {
      init: {
        always: [
          {
            target: "authenticate",
          },
        ],
      },
      authenticate: {
        invoke: {
          src: (context, event) => authenticateUser(),
          onDone: {
            target: "private",
            actions: assign({
              user: (context, event) => event.data,
            }),
          },
          onError: {
            target: "public",
            actions: assign({
              error: (context, event) => event.data,
            }),
          },
        },
      },
      public: {
        //Delete LocalStorage and Clear Cookies
        on: {
          LOGIN: [{ target: "authenticate" }],
        },
      },
      private: {
        on: {
          LOGOUT: { target: "public", actions: ["clearUserInfo"] },
        },
      },
    },
  },
  {
    actions: {
      clearUserInfo: (context) => {
        //Clear LocalStorage, Cookies etc
      },
    },
  }
);
