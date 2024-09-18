import { Request, Response, NextFunction } from "express";

/**
 * 中間件用於統一格式化回應
 *
 * @param _ - Express 的 Request 對象（未使用）
 * @param res - Express 的 Response 對象，已擴展了 sendResponse 方法
 * @param next - Express 的 NextFunction 回調函數
 */
const formatResponse = (
  _: Request,
  res: Response,
  next: NextFunction
): void => {
  /**
   * 自定義的回應方法
   *
   * @param statusCode - HTTP 狀態碼
   * @param data - 回應數據
   * @param message - 回應消息，默認為 "發生未預期錯誤，請聯繫資訊人員"
   */
  res.sendResponse = (
    statusCode: number,
    data: any,
    message: string = "發生未預期錯誤，請聯繫資訊人員"
  ): void => {
    const response = {
      code: statusCode || 200,
      response: data || {},
      msg: message || "",
    };
    res.status(statusCode || 200).json(response);
  };

  next();
};

export default formatResponse;
