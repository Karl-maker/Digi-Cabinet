import service from "../../service/index.mjs";
import logger from "../../log/server-logger.mjs";
import rateLimit from "express-rate-limit";

const TOP_ROUTE = "/user";


function controller(router){

    return (req, res, next) => {
        router.post(`/user`, (req, res, next) => { res.status(200).json( {message: "User Route"} ) });
        
        next();
    } 
};

export default controller;