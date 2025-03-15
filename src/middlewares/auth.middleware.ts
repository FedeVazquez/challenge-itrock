import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface AuthRequest extends Request {
  user?: { id: string; username: string };
}

export default async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const tokenHeader = req.header("Authorization");

    if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Acceso denegado, token requerido" });
      return;
    }

    const token = tokenHeader.split(" ")[1];

    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string; username: string };

    req.user = decoded;

    next();
  } catch (error) {
    console.error("Error en autenticación:", error);
    res.status(401).json({ message: "Token inválido" });
  }
}