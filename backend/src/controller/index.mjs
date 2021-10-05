/*

All routes to controller meets here..

*/

import express from "express";
import test from "./controllers/test.mjs";
const router = express.Router();

router.use("/test", test);

export default router;