import service from "../../service/index.mjs";
import logger from "../../log/server-logger.mjs";
import rateLimit from "express-rate-limit";

const TOP_ROUTE = "/auth";
const registerLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 10,
  });

function controller(router){

    return (req, res, next) => {
        router.post(`/register`, registerLimiter, register);

        next();
    };  
};

function register(req, res, next) {
    service
    .user
    .create(req)
    .then(() => {
        logger.info({message: "New Account Created", timestamp: new Date().toString()})
        res.status(200).json({ message: "Registration Successful" });
    })
    .catch((err) => {
        next(err);
    });
}

export default controller;