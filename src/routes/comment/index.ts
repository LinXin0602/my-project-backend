import express from "express";
import {
  createdComment,
  getComments,
  deleteComment,
  likeComment,
  updatedComment,
} from "../../controllers/comment"; // 加上 .js 擴展名

const route = express.Router();

route.post("/createComment", createdComment);
route.get("/getComments", getComments);
route.delete("/deleteComment", deleteComment);
route.post("/likeComment", likeComment);
route.patch("/updateComment", updatedComment);

export default route;
