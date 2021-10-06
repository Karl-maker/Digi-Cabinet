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
},

optimization: {
  RATE_LIMIT_WINDOWMS: process.env.DEV_RATE_LIMIT_WINDOWMS || 15, //In minutes
  RATE_LIMIT_MAX: process.env.DEV_RATE_LIMIT_MAX || 100,
  COMPRESSION_LEVEL: process.env.DEV_COMPRESSION_LEVEL || 6,
  COMPRESSION_MEMLEVEL: process.env.DEV_COMPRESSION_MEMLEVEL || 8,
  COMPRESSION_CHUNKSIZE: process.env.DEV_COMPRESSION_CHUNKSIZE || 16384,
  COMPRESSION_WINDOWBITS: process.env.DEV_COMPRESSION_WINDOWBITS || 15,
  COMPRESSION_THRESHOLD_LIMIT:
    process.env.DEV_COMPRESSION_THRESHOLD_LIMIT || 0, //in bytes
},

};
