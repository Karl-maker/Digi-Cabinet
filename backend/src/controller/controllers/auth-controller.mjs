const TOP_ROUTE = "/auth";

function controller(router){

    return (req, res, next) => {
        router.get(`${TOP_ROUTE}/`, (req, res, next) => {
            res.status(200).json({ message: "Welcome to Digi-Connect API Test" , 
            timestamp: `${new Date().toString()}` });
        });

        router.get(`${TOP_ROUTE}/foo`, (req, res, next) => {
            res.status(200).json({ message: "Welcome to Foo API Test" , 
            timestamp: `${new Date().toString()}` });
        });

        next();
    };  
};


export default controller;