
const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';
import '../../common/env'

export function verifyTokenForAdminRole(req: Request, res: Response, next: NextFunction) {
  const decoded = verifyToken(req, res);
  if (!decoded) return;
  if (decoded.role !== 'admin') {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }
  next();
}

export function verifyTokenForJudgerRole(req: Request, res: Response, next: NextFunction) {
  const decoded = verifyToken(req, res);
  if (!decoded) return;
  if (decoded.role !== 'judger' && decoded.role !== 'admin') {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }
  next();
}

function verifyToken(req: Request, res: Response): any {
  const token = req.header('Authorization');
  if (!token) {
    res.status(401).json({ error: 'Access denied' })
    return;
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET);

  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};