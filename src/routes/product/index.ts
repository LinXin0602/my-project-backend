import express from "express";
const route = express.Router();
import { createProduct, getProduct } from "../../controllers/product";

route.post("/createProduct", createProduct);
route.post("/createProduct", getProduct);

module.exports = route;
