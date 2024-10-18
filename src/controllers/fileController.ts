// src/controllers/fileController.ts

import { Request, Response } from "express";

/**
 * 處理文件上傳的控制器函數
 *
 * @param req - Express 的 Request 對象，包含上傳的文件
 * @param res - Express 的 Response 對象，包含 sendResponse 方法
 */
const uploadFile = (req: any, res: any): void => {
  try {
    if (!req.file) {
      return res.sendResponse(500, null, "未選擇圖片");
    }

    res.send({
      message: "文件上傳成功",
      file: req.file,
    });
  } catch (err: any) {
    res.sendResponse(500, null, err.message);
  }
};

export default uploadFile;
