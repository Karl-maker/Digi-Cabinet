/*

Date Of Creation: 05/10/2021
Author: Karl-Johan Bailey

File / Module Information

1. This will be the entry point of the node.js backend application.
2. We will use .mjs files to use ES6 JavaScript with Node.js.
3. The goal is to create a RESTful API ONLY using json data as responses, AND creating a static file route for images and other resources needed by the client using /container.

*/

import express from "express";
import { createServer } from "http";
//------------------------------------------
import config from "./config/config.mjs";
import { initialize } from "./server/server.mjs";
import logger from "./log/server-logger.mjs";

const app = express();
const server = createServer(app);

//----START-----

initialize(app, { express: express });

server.listen(config.server.PORT, config.server.HOST, () => {
    logger.info({
        message: `Digi-Cabinet Server Started and Listening on ${server.address().address}:${
          server.address().port
        } in a ${config.environment.NODE_ENV} environment`,
        timestamp: `${new Date().toString()}`,
    });
});
