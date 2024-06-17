const express = require("express");
const route = express.Router();
const processController = require("../controllers/process");

route.post("/login", processController.login);

module.exports = route;
