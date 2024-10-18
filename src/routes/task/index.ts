import express from "express";
import {
  createTask,
  getUserTasks,
  getSingleTask,
  deleteTask,
  updateTask,
} from "../../controllers/task"; // 這裡需要加上 .js 擴展名

const route = express.Router();

route.post("/createTask", createTask);
route.get("/getUserTasks", getUserTasks);
route.get("/getSingleTask", getSingleTask);
route.delete("/deleteTask", deleteTask);
route.patch("/updateTask", updateTask);

export default route;
