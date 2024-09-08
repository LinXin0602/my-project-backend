const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mimetypeList = ["image/jpeg", "image/png"];
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const filePath = req.filePath || "uploads/";

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }

    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (!mimetypeList.includes(file.mimetype)) {
    cb(console.log(file.mimetype));
    cb(new Error("請上傳圖片格式"));
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
