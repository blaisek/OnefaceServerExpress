
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request & { tokenContent?: any }, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token)
    return res.status(401).json({ message: 'You need to be authorized to access this part of api', reason: 'Missing token' });

  try {
    const tokenContent = jwt.verify(token, process.env.JWT_SECRET);
    req.tokenContent = tokenContent;
    next();
  }
  catch (e) {
    res.status(401).json({ message: 'You need to be authorized to access this part of api', reason: 'Invalid or expired token' });
  }
};