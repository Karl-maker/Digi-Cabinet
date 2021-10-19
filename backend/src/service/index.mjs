import user from "./services/user-service.mjs";
import auth from "./services/auth-service.mjs";
import institution from "./services/institution-service.mjs";
import association from "./services/association-service.mjs";
import student from "./services/student-service.mjs";

const service = {
  user,
  auth,
  institution,
  association,
  student,
};

export default service;
