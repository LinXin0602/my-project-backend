import { Request, Response } from "express";
import UserPayload from "../src/types/user";

declare module "express-serve-static-core" {
  interface Request {
    user?: UserPayload;
    filePath?: string; // 自定义属性
    file?: Express.Multer.File; // 单文件上传
    files?: Express.Multer.File[]; // 多文件上传
  }

  interface Response {
    sendResponse: (statusCode: number, data: any, message?: string) => void;
  }
}
