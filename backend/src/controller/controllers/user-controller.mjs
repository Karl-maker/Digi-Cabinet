import service from "../../service/index.mjs";
import logger from "../../log/server-logger.mjs";
const TOP_ROUTE = "/user";

function controller(router){

    return (req, res, next) => {
        router.post(`${TOP_ROUTE}/`, register);
        
        next();
    } 
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