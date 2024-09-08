import { Product } from "../../models/product";
const upload = require("../../middleware/uploadMiddleware.js");
import { NextFunction } from "express";

export const createProduct = [
  //自訂第一個middleware 取得path
  (req: any, res: any, next: NextFunction) => {
    req.filePath = `uploads/product`;
    next();
  },
  //第二個middleware
  upload.single("image"),
  //執行商業邏輯
  async (req: any, res: any) => {
    try {
      if (!req.file || !req.body) {
        return res.sendany(500, null, "未上傳檔案或資料錯誤");
      }

      const params = {
        ...req.body,
        imageUrl: `${req.filePath}${req.file.filename}`,
      };

      const product = new Product(params);
      await product.save();

      res.sendany(200, product, "新增成功");
    } catch (err) {
      console.log(err);
      res.sendany(500, err);
    }
  },
];
export const getProduct = async (req: any, res: any) => {
  try {
    const productId = req.query.productId || null;
    const params = {
      productId,
    };
    let product;
    if (productId) {
      product = await Product.find(params);
    } else {
      product = await Product.find();
    }
    res.sendany(200, product, "查詢成功");
  } catch (err) {
    res.sendany(500, err);
  }
};
