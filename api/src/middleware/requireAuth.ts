import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ProtectedRequest } from "../ts/types";

const requireAuth = (req: ProtectedRequest, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ error: true, msg: "No token, authorization denied" });
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export { requireAuth };
