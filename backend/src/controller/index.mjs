/*

All routes to controller meets here..

*/

import auth from "./controllers/auth-controller.mjs";

function routes(router){

    return router.use((req, res, next) => {
        router.use(auth(router));

        next();
    });
};

export default routes;