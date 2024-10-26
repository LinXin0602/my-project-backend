import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  dbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/default-db",
  jwtSecret: process.env.JWTSECRET || "default_jwt_secret",
};

export default config;
