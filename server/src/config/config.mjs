/*
Author: Karl-Johan Bailey 05/10/2021

This file must controll configuration throughout the app with environment awareness.
*/
import dotenv from "dotenv-flow";
import fs, { readFile } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

dotenv.config();
const ENV = process.env;
const __dirname = dirname(fileURLToPath(import.meta.url));

//------Utilities------------

const readENVFile = (location) => {
  return fs.readFileSync(path.resolve(__dirname, location), "utf8");
};

//Default Variables

const variables = {
  environment: {
    RESOURCE_PATH: ENV.RESOURCE_PATH || "../container",
    BUILD: ENV.BUILD_PATH || "../../client/out",
    NODE_ENV: ENV.NODE_ENV || "development",
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
    DEFAULT_INSTITUTION_PATH:
      ENV.DEFAULT_INSTITUTION_PATH ||
      "/container/default/institution/school-icon.png",
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

  jwt: {
    ISSUER: ENV.JWT_ISSUER || "Software Engineers United",
    ALGORITHM: ENV.JWT_ALGORITHM || "RS256",
    IS_HTTPS: ENV.JWT_IS_HTTPS || false, //This is usually false
    REFRESH_TOKEN_LIFE: ENV.REFRESH_TOKEN_LIFE || 90,
    ACCESS_TOKEN_LIFE: ENV.ACCESS_TOKEN_LIFE || 10000,
    ACCESS_TOKEN_PUBLIC_KEY: readENVFile(
      ENV.ACCESS_TOKEN_PUBLIC_KEY || `../../keys/access-public.key`
    ),
    ACCESS_TOKEN_PRIVATE_KEY: readENVFile(
      ENV.ACCESS_TOKEN_PRIVATE_KEY || "../../keys/access-private.key"
    ),
    REFRESH_TOKEN_PUBLIC_KEY: readENVFile(
      ENV.REFRESH_TOKEN_PUBLIC_KEY || "../../keys/refresh-public.key"
    ),
    REFRESH_TOKEN_PRIVATE_KEY: readENVFile(
      ENV.REFRESH_TOKEN_PRIVATE_KEY || "../../keys/refresh-private.key"
    ),
  },
};

const config = { ...variables };

export default config;
