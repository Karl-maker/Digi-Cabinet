import service from "../../service/index.mjs";
import logger from "../../log/server-logger.mjs";
import config from "../../config/config.mjs";
import { protect } from "../../middleware/authorization.mjs";

import rateLimit from "express-rate-limit";

const TOP_ROUTE = "/auth";
const registerLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
});
const authenticationLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
});
const accessTokenLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
});
const confirmEmailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});

function controller(router) {
  return (req, res, next) => {
    router.post(`${TOP_ROUTE}/register`, registerLimiter, registerUser);
    router.post(
      `${TOP_ROUTE}/confirm-email`,
      confirmEmailLimiter,
      confirmUserEmail
    );
    router.post(
      `${TOP_ROUTE}/authentication`,
      authenticationLimiter,
      authenticateUser
    );
    router.get(
      `${TOP_ROUTE}/access-token`,
      accessTokenLimiter,
      getNewAccessToken
    );
    router.get(`${TOP_ROUTE}/current-user`, protect, getCurrentUser);

    next();
  };
}

function getCurrentUser(req, res, next) {
  res.status(200).json(req.user);
}

function confirmUserEmail(req, res, next) {
  service.auth
    .confirmEmail(req)
    .then(() => {
      logger.info({
        message: "Email Confirmed",
        timestamp: new Date().toString(),
      });
      res.status(200).json({ message: "Email Confirmed" });
    })
    .catch((err) => {
      next(err);
    });
}

function getNewAccessToken(req, res, next) {
  service.auth
    .getAccessToken(req)
    .then((results) => {
      logger.info({
        message: "Access Token Created",
        timestamp: new Date().toString(),
      });
      res.status(200).json({ results });
    })
    .catch((err) => {
      next(err);
    });
}

function registerUser(req, res, next) {
  service.user
    .create(req)
    .then((user) => {
      logger.info({
        message: "New Account Created",
        timestamp: new Date().toString(),
      });
      res.status(200).json({ message: "Registration Successful", user: user });
    })
    .catch((err) => {
      next(err);
    });
}

function authenticateUser(req, res, next) {
  service.auth
    .authenticate(req)
    .then((results) => {
      logger.info({
        message: "API Authenticated User",
        timestamp: new Date().toString(),
      });
      res
        .cookie("refresh_token", results.refresh_token.token, {
          secure: config.jwt.IS_HTTPS,
          httpOnly: true,
          //sameSite: true,
          expires: results.refresh_token.expires,
          path: "/api",
        })
        .status(200)
        .json({ results });
    })
    .catch((err) => {
      next(err);
    });
}

export default controller;
