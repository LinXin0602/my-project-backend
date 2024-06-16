const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
exports.login = async (req, res) => {
  try {
    const { account, password } = req.body;
    const user = await User.findOne({ account });
    if (!user) {
      res.sendResponse(500, null, "帳號或密碼錯誤");
      return;
    }
    const matchPwd = await bcrypt.compare(password, user.password);
    if (!matchPwd) {
      res.sendResponse(500, null, "帳號或密碼錯誤");
      return;
    }
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        account: user.account,
      },
      config.jwtSecret,
      { expiresIn: "1h" }
    );
    const data = {
      token,
      name: user.name,
      account,
    };
    res.sendResponse(200, data, "登入成功");
  } catch (e) {
    console.log(e);
    res.sendResponse(500, null);
  }
};
