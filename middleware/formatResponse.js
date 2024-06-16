const formatResponse = (req, res, next) => {
  res.sendResponse = (
    statusCode,
    data,
    message = "發生未預期錯誤，請聯繫資訊人員"
  ) => {
    const response = {
      code: statusCode || 200,
      response: data || {},
      msg: message || "",
    };
    res.status(200).json(response);
  };
  next();
};

module.exports = formatResponse;
