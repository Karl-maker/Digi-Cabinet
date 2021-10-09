import mongoose from "mongoose";
import logger from "../log/server-logger.mjs";
import config from "../config/config.mjs";

//............. DB MODELS.............................

import db from "../model/index.mjs";

// Create the database connection

const DB_STRING = config.database.DB_CONNECT;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    logger.error({
      message: `${err.message}`,
      timestamp: `${new Date().toString()}`,
    });
  }
};

// CONNECTION EVENTS

// When successfully connected
mongoose.connection.on("connected", () => {
  logger.info({
    message: "Mongoose default connection is open",
    timestamp: `${new Date().toString()}`,
  });
});

// If the connection throws an error
mongoose.connection.on("error", (err) => {
  logger.error({
    message: "Mongoose default connection error: " + err,
    timestamp: `${new Date().toString()}`,
  });
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  logger.info({
    message: "Mongoose default connection disconnected",
    timestamp: `${new Date().toString()}`,
  });
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    logger.info({
      message:
        "Mongoose default connection disconnected through app termination",
      timestamp: `${new Date().toString()}`,
    });
    process.exit(0);
  });
});

//..............Central access point to all db models.....................

export { db, connectDB };
