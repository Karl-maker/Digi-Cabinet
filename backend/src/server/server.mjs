import logger from "../log/server-logger.mjs";
import httpLogger from "../log/http-logger.mjs";

const initialize = (app, { express }) => {

    app.use(httpLogger); 

    app.use("/api", (req, res, next)=>{
        res.status(200).json({ message: "Welcome to Digi-Connect API" , 
        timestamp: `${new Date().toString()}` });
    });
}
  export { initialize };
  