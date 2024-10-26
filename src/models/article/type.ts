import mongoose from "mongoose";

export interface IArticle extends Document {
  title: string;
  content: string;
  owner: mongoose.Types.ObjectId;
}
