import mongoose, { Schema, Model } from "mongoose";
import type { ITask } from "./type";

// 創建 Task Schema
const taskSchema: Schema<ITask> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      required: true,
      enum: ["未啟動", "執行中", "收尾階段", "結束"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// 定義並導出 Task 模型
const Task: Model<ITask> = mongoose.model<ITask>("Task", taskSchema);

export default Task;
