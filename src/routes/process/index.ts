import express from "express";
import { login, register } from "../../controllers/process"; // 需要加上 .js 擴展名

const route = express.Router();

route.post("/login", login);
route.post("/register", register);

export default route;
