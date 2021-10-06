import logger from "../log/server-logger.mjs";
import errorFormatter from "../util/error-formatter.mjs";

export default errorHandler;

function errorHandler(err, req, res, next) {
    try {
        switch (true) {
            case err.name === "NotFound":
                //404 Errors
                logger.debug({
                message: err.message,
                stacktrace: err.stacktrace,
                timestamp: new Date().toString(),
                });
                return res.status(404).json({ message: err.message });
            case err.name === "UnauthorizedError":
                // jwt authentication error
                logger.debug({
                message: err.message,
                stacktrace: err.stacktrace,
                timestamp: new Date().toString(),
                });
                return res.status(401).json({ message: "Unauthorized" });
            default:
                logger.error({
                message: err.message,
                stacktrace: err.stacktrace,
                timestamp: new Date().toString(),
                });
                return res.status(500).json({ message: "Unexpected Error" });
        }
    } catch (e) {
        logger.error({
        message: e,
        stacktrace: err.stacktrace,
        timestamp: new Date().toString(),
        });
        return res.status(500).json({ message: "Unexpected Error" });
    }
}
