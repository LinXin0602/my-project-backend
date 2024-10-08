const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
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
        role: user.role || "user",
      },
      config.jwtSecret,
      { expiresIn: "24h" }
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
exports.register = async (req, res) => {
  try {
    const { account, password } = req.body;
    const user = await User.findOne({ account });
    if (user) {
      res.sendResponse(500, null, "帳號已存在");
      return;
    }
    const hashPwd = await bcrypt.hash(password, 10);

    const params = {
      ...req.body,
      password: hashPwd,
      approved: false,
    };

    const newUser = await User.create(params);
    res.sendResponse(200, newUser, "註冊成功");
  } catch (e) {
    console.log(e);
    res.sendResponse(500, null);
  }
};
