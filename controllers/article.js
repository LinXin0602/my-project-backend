const Article = require("../models/article");

exports.createArticle = async (req, res) => {
  try {
    const userId = req.user.id;
    const params = { ...req.body, owner: userId };

    const article = await Article.create(params);
    res.sendResponse(200, article, "創建成功");
  } catch (e) {
    res.sendResponse(500, e);
  }
};
exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.body;
    const params = {
      ...req.body,
    };
    const article = await Article.findByIdAndUpdate(id, params, {
      new: true,
      runValidators: true,
    });
    res.sendResponse(200, article, "修改成功");
  } catch (e) {
    res.sendResponse(500, e);
  }
};

exports.getUserArticle = async (req, res) => {
  try {
    const userId = req.user.id;
    const params = {
      owner: userId,
    };
    const article = await Article.find(params);
    res.sendResponse(200, article, "查詢成功");
  } catch (e) {
    res.sendResponse(500, e);
  }
};
exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.body;
    const article = await Article.findByIdAndDelete(id);
    res.sendResponse(200, article, "刪除成功");
  } catch (e) {
    res.sendResponse(500, e);
  }
};
exports.getSingleArticle = async (req, res) => {
  try {
    const { id } = req.query;
    const params = {
      _id: id,
    };
    const article = await Article.findById(params);
    res.sendResponse(200, article, "查詢成功");
  } catch (e) {
    res.sendResponse(500, e);
  }
};
