import fileRoutes from "./fileRoutes/index";
import userRoutes from "./user/index";
import processRoutes from "./process/index";
import taskRoutes from "./task/index";
import article from "./article/index";
import comment from "./comment/index";
import product from "./product/index";
import express from "express";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/process", processRoutes);
router.use("/upload", fileRoutes);
router.use("/task", taskRoutes);
router.use("/article", article);
router.use("/comment", comment);
router.use("/product", product);

export default router;
