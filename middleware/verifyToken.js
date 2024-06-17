const jwt = require("jsonwebtoken");
const config = require("../config/config");

//白名單，在白名單內的path不用驗證jwt
const whiteList = ["/api/process/login", /^\/uploads/];

const verifyToken = async (req, res, next) => {
  console.log(req.path);
  const isWhiteListed = whiteList.some((pattern) => {
    if (typeof pattern === "string") {
      return req.path === pattern;
    } else if (pattern instanceof RegExp) {
      return pattern.test(req.path);
    }
    return false;
  });

  if (isWhiteListed) {
    next();
    return;
  }
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(401).send("未攜帶token");
  }
  const token = bearerToken.split(" ")[1];
  try {
    const decoded = await jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    if (err.name === "TokenExpiredError") {
      return res.status(401).send("token已過期");
    }
    return res.status(401).send("token無效");
  }
};
module.exports = verifyToken;
