const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    content: { type: String, require: true },
    owner: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
