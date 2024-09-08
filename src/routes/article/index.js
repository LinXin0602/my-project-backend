const express = require("express");
const route = express.Router();
const {
  createArticle,
  updateArticle,
  getUserArticle,
  getSingleArticle,
  deleteArticle,
} = require("../../controllers/article");

route.post("/createArticle", createArticle);
route.patch("/updateArticle", updateArticle);
route.get("/getUserArticle", getUserArticle);
route.get("/getSingleArticle", getSingleArticle);
route.delete("/deleteArticle", deleteArticle);
module.exports = route;
