// src/middleware/upload.ts

import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

/**
 * Multer 上傳中間件配置
 */

// 允許的 MIME 類型列表
const mimetypeList: string[] = ["image/jpeg", "image/png"];

/**
 * 設置 Multer 的存儲引擎
 */
const storage = multer.diskStorage({
  destination: (
    req: any,
    file: Express.Multer.File,
    cb: (error: any, destination: string) => void
  ) => {
    const filePath = req.filePath || "uploads/";

    // 如果目錄不存在，則創建它
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
      console.log(`Created directory: ${filePath}`);
    }

    cb(null, filePath);
  },
  filename: (
    req: any,
    file: Express.Multer.File,
    cb: (error: any, filename: string) => void
  ) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${file.fieldname}-${uniqueSuffix}${path.extname(
      file.originalname
    )}`;
    cb(null, filename);
  },
});

/**
 * 定義文件過濾器，以限制上傳的文件類型
 */
const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (!mimetypeList.includes(file.mimetype)) {
    console.log(`Unsupported file type: ${file.mimetype}`);
    cb(new Error("請上傳圖片格式"));
  } else {
    cb(null, true);
  }
};

/**
 * 創建 Multer 上傳實例
 */
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
