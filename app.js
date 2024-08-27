const express = require("express");
const path = require("path");
const app = express();
const config = require("./config/config");
const port = config.port || 3000;
const dbUri = config.dbUri || "mongodb://127.0.0.1:27017/MyProject";
const cors = require("cors");
const router = require("./routes/index.js");
const mongoose = require("mongoose");
const formatResponse = require("./middleware/formatResponse");
const timezoneMiddleware = require("./middleware/timezoneFormat.js");
const verifyToken = require("./middleware/verifyToken.js");
const swaggerSetup = require("./utils/swagger.js");
app.use(express.json());
app.use(cors());

//統一response格式
app.use(formatResponse);
app.use(timezoneMiddleware);

//驗證JWT
app.use(verifyToken);

// Routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", router);

// 整合Swagger
swaggerSetup(app);

const startServer = () => {
  app.listen(port, () => {
    console.log("server is running");
  });
};

const activateDB = async () => {
  try {
    await mongoose.connect(dbUri);
    startServer();
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("MongoDB connection error: ", err);
  }
};

activateDB();
