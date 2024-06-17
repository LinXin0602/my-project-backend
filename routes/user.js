const express = require("express");

const route = express.Router();

const userController = require("../controllers/users");

route.get("/getAllUsers", userController.getAllUsers);
route.post("/createUser", userController.createUser);
route.get("/getUserProfile", userController.getUserProfile);
route.delete("/deleteUser", userController.deleteUser);
route.patch("/updateUser", userController.updateUser);
module.exports = route;
