import logger from "../log/server-logger.mjs";
import httpLogger from "../log/http-logger.mjs";
import routes from "../controller/index.mjs";
import config from "../config/config.mjs";
///-----------------------------------------------

//utilites
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const initialize = (app, { express }) => {

    app.use(httpLogger); 
    app.use("/api", routes);
    //Static Route
    app.use(
        "/container",
        express.static(
          path.join(__dirname, `../${config.environment.RESOURCE_PATH}`)
        )
    );

}


export { initialize };
  