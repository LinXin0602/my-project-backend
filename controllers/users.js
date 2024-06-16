const User = require("../models/user");
const bcrypt = require("bcrypt");
exports.createUser = async (req, res) => {
  try {
    const { password, account } = req.body;
    const getUser = await User.findOne({ account });
    //先判斷是否有該帳號，若有則回傳訊息
    if (getUser) {
      res.sendResponse(500, null, "此帳號已經存在");
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const params = { ...req.body, password: hashedPassword };
    const newUser = await User.create(params);
    res.sendResponse(200, newUser, "成功");
  } catch (err) {
    res.sendResponse(500, null);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.sendResponse(200, users, "成功");
  } catch (err) {
    res.sendResponse(500, null);
  }
};
exports.getUserProfile = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findById(id);
    if (!user) {
      res.sendResponse(500, null, "查無此用戶");
    } else {
      res.sendResponse(200, user, "成功");
    }
  } catch (err) {
    res.sendResponse(500, null);
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findByIdAndDelete(id);
    res.sendResponse(200, user, "刪除成功");
  } catch (e) {
    res.sendResponse(500, null);
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.sendResponse(200, user, "修改成功");
  } catch (e) {
    console.log(e);
    res.sendResponse(500, null);
  }
};
