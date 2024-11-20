import { Request, Response, NextFunction } from "express";
import { User } from "../entity/user.model";
import { verifyToken } from "../utils/jwt.util";
import admin from 'firebase-admin';


export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || "";
    if (!token)
      return res
        .status(403)
        .send({ message: "unauthorized or access token missing" });
    const decodedUser = verifyToken(token);
    if (!decodedUser) return res.status(401).send({ message: "unauthorized" });
    req.user = decodedUser;
    next();
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};

export const verifyFirebaseToken = async (req:Request, res:Response, next:NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1] || "";

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Firebase token verification failed:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};
