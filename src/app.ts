import mongoose from "mongoose";
import express from "express";
import path from "path";
import cors from "cors";
import formatResponse from "./middleware/formatResponse";
import timezoneMiddleware from "./middleware/timezoneFormat";
import verifyToken from "./middleware/verifyToken";
import config from "../config/config";
import router from "./routes/index";
import swaggerSetup from "./utils/swagger";

const app = express();
const port: number = config.port || 3000;
const dbUri: string = config.dbUri || "mongodb://127.0.0.1:27017/MyProject";

app.use(express.json());
app.use(cors());

// 統一response格式
app.use(formatResponse);
app.use(timezoneMiddleware);

// 驗證JWT
app.use(verifyToken);

// Routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", router);

// 整合Swagger
swaggerSetup(app);

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
};

const activateDB = async () => {
  try {
    await mongoose.connect(dbUri);
    startServer();
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

activateDB();

export default app;
