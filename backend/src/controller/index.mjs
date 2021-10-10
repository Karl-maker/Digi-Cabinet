/*

All routes to controller meets here..

*/

import auth from "./controllers/auth-controller.mjs";
import user from "./controllers/user-controller.mjs";

function routes(router){

    return router.use(auth(router), user(router));
};

export default routes;