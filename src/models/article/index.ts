import mongoose, { Schema, Model } from "mongoose";
import type { IArticle } from "./type";

// 創建 Article Schema
const articleSchema: Schema<IArticle> = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// 定義並導出 Article 模型
const Article: Model<IArticle> = mongoose.model<IArticle>(
  "Article",
  articleSchema
);

export default Article;
