// src/routes/fileRoutes.ts

import express, { Request, Response, NextFunction } from "express";
import { MulterError } from "multer";
import uploadFile from "../../controllers/fileController";
import uploadMiddleware from "../../middleware/uploadMiddleware";

const router = express.Router();

/**
 * 文件上傳路由
 */
router.post("/", (req: any, res: any, next: NextFunction) => {
  uploadMiddleware.single("image")(req, res, (err: any) => {
    if (err instanceof MulterError) {
      return res.sendResponse(500, null, "文件上傳失敗");
    } else if (err) {
      return res.sendResponse(500, null, err.message);
    }
    uploadFile(req, res);
  });
});

export default router;
