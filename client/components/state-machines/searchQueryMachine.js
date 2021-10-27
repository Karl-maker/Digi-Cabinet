import { createMachine, assign } from "xstate";

/*

*/

export const searchQueryMachine = createMachine({
  id: "search_query",
  initial: "by_name",
  states: {
    by_name: {
      on: {
        TOGGLE: { target: "by_id" },
      },
    },
    by_id: {
      on: {
        TOGGLE: { target: "by_name" },
      },
    },
  },
});
