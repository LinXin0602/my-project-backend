const express = require("express");
const route = express.Router();
const taskController = require("../../controllers/Task");

route.post("/createTask", taskController.createTask);
route.get("/getUserTasks", taskController.getUserTasks);
route.get("/getSingleTask", taskController.getSingleTask);
route.delete("/deleteTask", taskController.deleteTask);
route.patch("/updateTask", taskController.updateTask);
module.exports = route;
