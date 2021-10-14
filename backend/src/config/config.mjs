/*
Author: Karl-Johan Bailey 05/10/2021

This file must controll configuration throughout the app with environment awareness.
*/
import dotenv from "dotenv-flow";

dotenv.config();
const ENV = process.env;

//Default Variables

const variables = {
  environment: {
    RESOURCE_PATH: ENV.RESOURCE_PATH || "../container",
  },

  //Server API:
  server: {
    PROTOCOL: ENV.PROTOCOL || "http",
    HOST: ENV.API_HOST || "localhost",
    PORT: ENV.API_PORT || 8000,
  },

  debug: {
    LOG_FILE: ENV.LOG_FILE || "./logs/server.log", //Relative to Log folder in source
    LOG_MAXSIZE: ENV.LOG_MAXSIZE || 5242880, //5MB
    LOG_MAXFILES: ENV.LOG_MAXFILE || 5,
  },

  resource: {
    DEFAULT_IMAGE_PATH:
      ENV.DEFAULT_IMAGE_PATH ||
      "/container/default/profile/profile-pic-icon-1.png",
  },

  database: {
    DB_CONNECT: ENV.DB_CONNECT,
  },

  optimization: {
    RATE_LIMIT_WINDOWMS: ENV.RATE_LIMIT_WINDOWMS || 15, //In minutes
    RATE_LIMIT_MAX: ENV.RATE_LIMIT_MAX || 100,
    COMPRESSION_LEVEL: ENV.COMPRESSION_LEVEL || 6,
    COMPRESSION_MEMLEVEL: ENV.COMPRESSION_MEMLEVEL || 8,
    COMPRESSION_CHUNKSIZE: ENV.COMPRESSION_CHUNKSIZE || 16384,
    COMPRESSION_WINDOWBITS: ENV.COMPRESSION_WINDOWBITS || 15,
    COMPRESSION_THRESHOLD_LIMIT: ENV.COMPRESSION_THRESHOLD_LIMIT || 0, //in bytes
  },

  email: {
    SENDER_EMAIL_SERVICE: ENV.SENDER_EMAIL_SERVICE || "Gmail",
    SENDER_EMAIL_ADDRESS: ENV.SENDER_EMAIL_ADDRESS,
    SENDER_EMAIL_PASSWORD: ENV.SENDER_EMAIL_PASSWORD,
  },

  bcrypt: {
    SALTORROUNDS: 10,
  },
};

const config = { ...variables };

export default config;
