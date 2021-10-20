import morgan from "morgan";
import json from "morgan-json";
import logger from "./server-logger.mjs";

//Setup Tokens

morgan.token(
  "ip",
  (req) =>
    (req.headers["x-forwarded-for"] || "").split(",").pop().trim() ||
    req.socket.remoteAddress
);
morgan.token("user", (req) => {
  if (req.user) {
    return req.user.email;
  }
  return "guest";
});

//Logger format

const format = json({
  method: ":method",
  url: ":url",
  status: ":status",
  ip: ":ip",
  user: ":user",
  responseTime: ":response-time",
});

const httpLogger = morgan(format, {
  stream: {
    write: (message) => {
      const { method, url, status, ip, user, responseTime } =
        JSON.parse(message);

      logger.info("HTTP Access Log", {
        user,
        ip,
        method,
        url,
        status: Number(status),
        timestamp: new Date().toString(),
        responseTime: Number(responseTime),
      });
    },
  },
});

export default httpLogger;
