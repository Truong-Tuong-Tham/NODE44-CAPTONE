import express from "express";
import authRouter from "./auth.router.js";
import homeRouter from "./home.router.js";
import detailRouter from "./detail.router.js";
import adminRouter from "./admin.router.js";

// tạo object router tổng
const rootRoutes = express.Router();

rootRoutes.use("/auth", authRouter);
rootRoutes.use("/home", homeRouter);
rootRoutes.use("/detail", detailRouter);
rootRoutes.use("/admin", adminRouter);

export default rootRoutes;
