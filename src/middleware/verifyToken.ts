// src/middleware/verifyToken.ts

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config/config";
import { UserPayload } from "../types/user";

/**
 * 白名單，在白名單內的 path 不用驗證 JWT
 */
const whiteList: (string | RegExp)[] = [
  "/api/process/login",
  /^\/uploads/,
  /^\/api-docs\//,
  "/api/process/register",
];

/**
 * JWT 驗證中間件
 *
 * @param req - Express 的 Request 對象
 * @param res - Express 的 Response 對象
 * @param next - Express 的 NextFunction 回調函數
 */
const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log(`Request Path: ${req.path}`);

  const isWhiteListed = whiteList.some((pattern) => {
    if (typeof pattern === "string") {
      return req.path === pattern;
    } else if (pattern instanceof RegExp) {
      return pattern.test(req.path);
    }
    return false;
  });

  if (isWhiteListed) {
    next();
    return;
  }

  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    res.status(401).send("未攜帶token");
    return;
  }

  const token = bearerToken.split(" ")[1];

  if (!token) {
    res.status(401).send("未攜帶token");
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as UserPayload &
      JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);

    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).send("token已過期");
      return;
    }

    res.status(401).send("token無效");
  }
};

export default verifyToken;
