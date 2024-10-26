import mongoose, { Document, Schema, Model } from "mongoose";

import type { IUser } from "./type";

// 創建 User Schema
const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    account: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["user", "admin"] },
    approved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// 定義並導出 User 模型
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
