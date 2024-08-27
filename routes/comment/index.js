const express = require("express");
const route = express.Router();

const {
  createdComment,
  getComments,
  deleteComment,
  likeComment,
  updatedComment,
} = require("../../controllers/comment");

route.post("/createComment", createdComment);
route.get("/getComments", getComments);
route.delete("/deleteComment", deleteComment);
route.post("/likeComment", likeComment);
route.patch("/updateComment", updatedComment);
module.exports = route;
