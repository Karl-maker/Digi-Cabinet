import logger from "../log/server-logger.mjs";
import httpLogger from "../log/http-logger.mjs";
import routes from "../controller/index.mjs";
import config from "../config/config.mjs";
import { corsOrigins } from "../middleware/cors.mjs";
///-----------------------------------------------
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

//utilites
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const limiter = rateLimit({
    windowMs: config.optimization.RATE_LIMIT_WINDOWMS * 60 * 1000,
    max: config.optimization.RATE_LIMIT_MAX,
  });
const initialize = (app, { express }) => {

    app.use(httpLogger); 
    app.use(helmet());
    app.use(limiter);
    app.use(urlencodedParser);
    app.use(jsonParser);
    app.use(cookieParser());
    app.use(
        cors({
          origin: corsOrigins.origin,
          optionSuccessStatus: 200,
        })
      );

    /*
    ----------------------------------------------------------------
    *****************Static and API routes below********************
    ----------------------------------------------------------------
    */


    app.use("/api", routes);
    app.use(
        "/container",
        express.static(
          path.join(__dirname, `../${config.environment.RESOURCE_PATH}`)
        )
    );

}


export { initialize };
  