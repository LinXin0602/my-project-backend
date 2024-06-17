const express = require("express");
const app = express();
const config = require("./config/config");
const port = config.port || 3000;
const dbUri = config.dbUri || "mongodb://127.0.0.1:27017/MyProject";
const cors = require("cors");
const userRoutes = require("./routes/user.js");
const processRoutes = require("./routes/process.js");
const mongoose = require("mongoose");
const formatResponse = require("./middleware/formatResponse");
const verifyToken = require("./middleware/verifyToken.js");
app.use(express.json());
app.use(cors());

//統一response格式
app.use(formatResponse);
//驗證JWT
app.use(verifyToken);
// Routes
app.use("/users", userRoutes);
app.use("/process", processRoutes);

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

app.get("/", (req, res) => {
  res.send("這是一個get請求");
});
