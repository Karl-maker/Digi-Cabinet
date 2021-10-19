import user from "./services/user-service.mjs";
import auth from "./services/auth-service.mjs";
import institution from "./services/institution-service.mjs";

const service = {
  user,
  auth,
  institution,
};

export default service;
