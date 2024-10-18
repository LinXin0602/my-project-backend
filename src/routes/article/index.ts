import express from "express";
import {
  createArticle,
  updateArticle,
  getUserArticle,
  getSingleArticle,
  deleteArticle,
} from "../../controllers/article"; // 加上 .js 擴展名

const route = express.Router();

route.post("/createArticle", createArticle);
route.patch("/updateArticle", updateArticle);
route.get("/getUserArticle", getUserArticle);
route.get("/getSingleArticle", getSingleArticle);
route.delete("/deleteArticle", deleteArticle);

export default route;
