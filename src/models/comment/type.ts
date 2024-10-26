import mongoose from "mongoose";

// 定義 Comment 接口，對應評論資料結構
export interface IComment extends Document {
  comment: string;
  likesCount: number;
  owner: mongoose.Types.ObjectId;
  article: mongoose.Types.ObjectId;
  likedBy: mongoose.Types.ObjectId[];
}
