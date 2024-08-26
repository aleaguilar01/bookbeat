import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IJwtPayload } from "../controllers/userController";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = extractToken(req);
  if (!token) {
    console.log('No Token Provided')
    return res.status(401).json({ error: "Access denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SIGN!) as IJwtPayload;
    req.user = { userId: decoded.userId, email: decoded.email };
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};


const extractToken = (req: Request) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
  } 
  return null;
}