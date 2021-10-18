import service from "../../service/index.mjs";
import logger from "../../log/server-logger.mjs";
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

function controller(router) {
  return (req, res, next) => {
    router.post(`${TOP_ROUTE}/register`, registerLimiter, register);
    router.post(
      `${TOP_ROUTE}/authentication`,
      authenticationLimiter,
      authenticate
    );
    router.get(`${TOP_ROUTE}/access-token`, accessTokenLimiter);

    next();
  };
}

function register(req, res, next) {
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

function authenticate(req, res, next) {}

export default controller;
