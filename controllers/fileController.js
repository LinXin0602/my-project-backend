exports.uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.sendResponse(500, null, "未選擇圖片");
    }

    res.send({
      message: "文件上传成功",
      file: req.file,
    });
  } catch (err) {
    res.sendResponse(500, null, err.message);
  }
};
