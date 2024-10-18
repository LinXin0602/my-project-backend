import moment from "moment-timezone";
import { Request, Response, NextFunction } from "express";

/**
 * 中間件用於格式化回應中的時間字段，將其轉換為指定的時區。
 *
 * @param req - Express 的 Request 對象
 * @param res - Express 的 Response 對象
 * @param next - Express 的 NextFunction 回調函數
 */
const timezoneKey: string[] = ["createdAt", "updatedAt"];
const timezone = "Asia/Taipei"; // 設置時區

const timezoneMiddleware = (req: any, res: any, next: NextFunction): void => {
  // 保存原始的 res.send 方法
  const originalSend = res.send.bind(res);

  // 重寫 res.send 方法
  res.send = function (body: any) {
    try {
      let parsedBody: any;

      // 如果 body 是字符串，嘗試解析為 JSON
      if (typeof body === "string") {
        parsedBody = JSON.parse(body);
      }
      // 如果 body 是對象，直接使用
      else if (typeof body === "object" && body !== null) {
        parsedBody = body;
      }
      // 其他類型不處理，直接發送
      else {
        return originalSend(body);
      }

      // 檢查是否存在 response 字段
      if (parsedBody.response) {
        // 如果 response 是數組，逐個處理
        if (Array.isArray(parsedBody.response)) {
          parsedBody.response.forEach((item: any) => {
            timezoneKey.forEach((key) => {
              if (item[key]) {
                item[key] = moment(item[key]).tz(timezone).format();
              }
            });
          });
        }
        // 如果 response 是對象，直接處理
        else {
          timezoneKey.forEach((key) => {
            if (parsedBody.response[key]) {
              parsedBody.response[key] = moment(parsedBody.response[key])
                .tz(timezone)
                .format();
            }
          });
        }
      }

      // 根據原始 body 的類型決定是否需要字符串化
      const modifiedBody =
        typeof body === "string" ? JSON.stringify(parsedBody) : parsedBody;
      return originalSend(modifiedBody);
    } catch (e) {
      console.error("Error parsing JSON:", e);
      // 發生錯誤時，發送原始 body
      return originalSend(body);
    }
  };

  // 繼續處理後續的中間件
  next();
};

export default timezoneMiddleware;
