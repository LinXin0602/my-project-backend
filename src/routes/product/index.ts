import express from "express";
const route = express.Router();
import {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../../controllers/product";

route.post("/createProduct", createProduct);
route.get("/getProduct", getProduct);
route.patch("/updateProduct", updateProduct);
route.delete("/deleteProduct", deleteProduct);

export default route;
