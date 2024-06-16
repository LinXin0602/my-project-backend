const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    account: { type: String, required: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
