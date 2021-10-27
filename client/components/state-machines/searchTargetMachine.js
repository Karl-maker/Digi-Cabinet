import { createMachine, assign } from "xstate";

/*

*/

export const searchTargetMachine = createMachine({
  id: "search_target",
  initial: "institutions",
  states: {
    institutions: {
      on: {
        USERS: { target: "users" },
        STUDENTS: { target: "students" },
      },
    },
    students: {
      on: {
        USERS: { target: "users" },
        INSTITUTIONS: { target: "institutions" },
      },
    },
    users: {
      on: {
        INSTITUTIONS: { target: "institutions" },
        STUDENTS: { target: "students" },
      },
    },
  },
});
