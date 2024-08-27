const express = require("express");
const route = express.Router();
const taskController = require("../../controllers/Task");

const { createTask, getUserTasks, getSingleTask, deleteTask, updateTask } =
  taskController;

route.post("/createTask", createTask);
route.get("/getUserTasks", getUserTasks);
route.get("/getSingleTask", getSingleTask);
route.delete("/deleteTask", deleteTask);
route.patch("/updateTask", updateTask);
module.exports = route;
