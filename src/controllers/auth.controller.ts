import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const token = authService.authenticateUser(username, password);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
