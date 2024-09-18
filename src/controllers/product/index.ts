import fs from "fs";
import path from "path";
import { Product } from "../../models/product";
import upload from "../../middleware/uploadMiddleware";
import { NextFunction } from "express";
import type { ProductType } from "./type";
import { promisify } from "util";
export const createProduct = [
  //自訂第一個middleware 取得path
  (req: any, _: any, next: NextFunction) => {
    req.filePath = `uploads/product`;
    next();
  },
  //第二個middleware
  upload.single("image"),
  //執行商業邏輯
  async (req: any, res: any) => {
    try {
      if (!req.file || !req.body) {
        return res.sendResponse(500, null, "未上傳檔案或資料錯誤");
      }

      const params = {
        ...req.body,
        imageUrl: `${req.filePath}/${req.file.filename}`,
      };

      const product = new Product(params);
      await product.save();

      res.sendResponse(200, product, "新增成功");
    } catch (err) {
      console.log(err);
      res.sendResponse(500, err);
    }
  },
];
export const getProduct = async (req: any, res: any) => {
  try {
    const productId = (req.query.productId as ProductType["_id"]) || null;
    const params = {
      productId,
    };
    let product: ProductType;
    if (productId) {
      product = await Product.find(params);
    } else {
      product = await Product.find();
    }

    res.sendResponse(200, product, "查詢成功");
  } catch (err) {
    res.sendResponse(500, err);
  }
};
export const updateProduct = async (req: any, res: any) => {
  try {
    const { productId } = req.body;
    const params = {
      ...req.body,
    };
    const product = await Product.findByIdAndUpdate(productId, params, {
      new: true,
      runValidators: true,
    });
    res.sendResponse(200, product, "修改成功");
  } catch (err) {
    res.sendResponse(500, err);
  }
};
export const deleteProduct = async (req: any, res: any) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.sendResponse(404, null, "查無產品");
    }
    const unlinkAsync = promisify(fs.unlink);

    const imageUrl = product.imageUrl;
    const imagePath = path.join(__dirname, "../../../", imageUrl);

    try {
      await unlinkAsync(imagePath);
    } catch (err) {
      console.error(err);
      return res.sendResponse(500, null, "圖片刪除失敗");
    }

    await Product.findByIdAndDelete(productId);
    res.sendResponse(200, product, "產品和圖片刪除成功");
  } catch (err) {
    res.sendResponse(500, err);
  }
};
