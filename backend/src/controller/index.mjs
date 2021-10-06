/*

All routes to controller meets here..

*/

import auth from "./controllers/auth-controller.mjs";

function routes(router){

    return router.use(auth(router));
};

export default routes;