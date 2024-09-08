const mongoose = require("mongoose");
import { Category } from "./type";
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
      enum: Object.values(Category),
    },
    isRebates: {
      type: Boolean,
    },
    imageUrl: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Product = mongoose.model("Product", productSchema);
