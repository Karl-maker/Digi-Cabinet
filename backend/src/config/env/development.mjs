import dotenv from "dotenv";
dotenv.config();

export default {
  //Server API:
  server: {
    PROTOCOL: process.env.DEV_PROTOCOL || "http",
    HOST: process.env.DEV_API_HOST || "localhost",
    PORT: process.env.DEV_API_PORT || 8000,
  },

  debug: {
    LOG_FILE: process.env.DEV_LOG_FILE || "./logs/server.log", //Relative to Log folder in source
    LOG_MAXSIZE: process.env.DEV_LOG_MAXSIZE || 5242880, //5MB
    LOG_MAXFILES: process.env.DEV_LOG_MAXFILE || 5,
}

};
