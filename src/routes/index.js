const userRoutes = require("./user/index.js");
const processRoutes = require("./process/index.js");
const fileRoutes = require("./fileRoutes/index.js");
const taskRoutes = require("./task/index.js");
const article = require("./article/index.js");
const comment = require("./comment/index.js");
const product = require("./product");
const express = require("express");

const router = express.Router();
router.use("/users", userRoutes);
router.use("/process", processRoutes);
router.use("/upload", fileRoutes);
router.use("/task", taskRoutes);
router.use("/article", article);
router.use("/comment", comment);
router.use("/product", product);

module.exports = router;
