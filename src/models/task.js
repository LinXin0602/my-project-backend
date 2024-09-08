const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      required: true,
      enum: ["未啟動", "執行中", "收尾階段", "結束"],
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
