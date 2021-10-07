import logger from "../log/server-logger.mjs";
import httpLogger from "../log/http-logger.mjs";
import routes from "../controller/index.mjs";
import config from "../config/config.mjs";
import { corsOrigins } from "../middleware/cors.mjs";
import errorHandler from "../middleware/error-handler.mjs";
import { compressorCheck, compressorStrategy } from "../util/compression.mjs";
///-----------------------------------------------
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";

//utilites
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const COMPRESSOR_STRATEGY = "DEFAULT";
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const limiter = rateLimit({
    windowMs: config.optimization.RATE_LIMIT_WINDOWMS * 60 * 1000,
    max: config.optimization.RATE_LIMIT_MAX,
  });
const initialize = (app, { express }) => {

    app.use(compression({
      level: config.optimization.COMPRESSION_LEVEL,
      threshold: config.optimization.COMPRESSION_THRESHOLD_LIMIT,
      chunkSize: config.optimization.COMPRESSION_CHUNKSIZE,
      memLevel: config.optimization.COMPRESSION_MEMLEVEL,
      windowBits: config.optimization.COMPRESSION_WINDOWBITS,
      strategy: compressorStrategy(COMPRESSOR_STRATEGY),
      filter: compressorCheck(compression),
    }));
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

    app.use(
        "/container",
        express.static(
        path.join(__dirname, `../${config.environment.RESOURCE_PATH}`)
        )
    );
    app.use("/api", routes(express.Router()));
    app.use("*", (req, res, next) =>{
        next({name: "NotFound", message: "Resource Not Found"});
    });
    
    //Error Handler
    app.use(errorHandler);
}

export { initialize };
  