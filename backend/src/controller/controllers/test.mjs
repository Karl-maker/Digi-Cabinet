import express from "express";
const router = express.Router();

router.get("/", (req, res, next)=>{
    res.status(200).json({ message: "Welcome to Digi-Connect API Test" , 
    timestamp: `${new Date().toString()}` });
});

export default router;