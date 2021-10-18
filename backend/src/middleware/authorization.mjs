import config from "../config/config.mjs";
import { db } from "../helper/db.mjs";
import jwt from "jsonwebtoken";

export { authorize, protect };

async function authorize(req, res, next) {
  // Header names in Express are auto-converted to lowercase
  try {
    let access_token =
      req.headers["x-access-token"] || req.headers["authorization"];

    // Remove Bearer from string
    access_token = access_token.replace(/^Bearer\s+/, "");

    //Get Key
    const ACCESS_TOKEN_PUBLIC_KEY = config.jwt.ACCESS_TOKEN_PUBLIC_KEY;

    const payload = await jwt.verify(access_token, ACCESS_TOKEN_PUBLIC_KEY, {
      issuer: config.jwt.ISSUER,
      subject: null, //req.body.username,
      audience: null, //req.body.origin,
      expiresIn: `${config.jwt.ACCESS_TOKEN_LIFE * 60}s`,
      algorithm: [config.jwt.ALGORITHM],
    });

    req.user = await db.user.findOne(
      { _id: payload.id },
      { token_expiration: 0, token_code: 0 }
    );
    next();
  } catch (err) {
    req.user = { email: "guest-user" };
    next();
  }
}

async function protect(req, res, next) {
  if (!req.user) {
    next({ name: "UnauthorizedError", message: "User Unauthorized" });
  } else {
    next();
  }
}
