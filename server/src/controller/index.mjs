/*

All routes to controller meets here..

*/

import auth from "./controllers/auth-controller.mjs";
import user from "./controllers/user-controller.mjs";
import institution from "./controllers/institution-controller.mjs";
import student from "./controllers/student-controller.mjs";

function routes(router) {
  return router.use(
    auth(router),
    user(router),
    institution(router),
    student(router)
  );
}

export default routes;
