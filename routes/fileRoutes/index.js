const express = require("express");
const router = express.Router();
const fileController = require("../../controllers/fileController");
const uploadMiddleware = require("../../middleware/uploadMiddleware");
const multer = require("multer");

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a file
 *     responses:
 *       200:
 *         description: File uploaded successfully
 */

router.post("", (req, res, next) => {
  uploadMiddleware.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.sendResponse(500, null, "文件上傳失敗");
    } else if (err) {
      return res.sendResponse(500, null, err.message);
    }
    fileController.uploadFile(req, res);
  });
});

module.exports = router;
