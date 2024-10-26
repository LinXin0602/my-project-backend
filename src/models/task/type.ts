import mongoose from "mongoose";

// 定義 Task 接口，對應任務資料結構
export interface ITask extends Document {
  title: string;
  description?: string;
  status: "未啟動" | "執行中" | "收尾階段" | "結束";
  owner: mongoose.Types.ObjectId;
}
