const moment = require("moment-timezone");

const timezoneKey = ["createdAt", "updatedAt"];
const timezoneMiddleware = (req, res, next) => {
  const originalSend = res.send;
  const timezone = "Asia/Taipei"; // 設置時區

  res.send = function (body) {
    try {
      const parsedBody = JSON.parse(body);
      //解析response 如果是array就在深一層
      if (parsedBody.response) {
        if (Array.isArray(parsedBody.response)) {
          parsedBody.response.forEach((item) => {
            timezoneKey.forEach((key) => {
              if (item[key]) {
                item[key] = moment(item[key]).tz(timezone).format();
              }
            });
          });
        } else {
          timezoneKey.forEach((key) => {
            if (parsedBody.response[key]) {
              parsedBody.response[key] = moment(parsedBody.response[key])
                .tz(timezone)
                .format();
            }
          });
        }
      }
      body = JSON.stringify(parsedBody);
    } catch (e) {
      console.error("Error parsing JSON:", e);
    }

    originalSend.call(this, body);
  };

  next();
};

module.exports = timezoneMiddleware;
