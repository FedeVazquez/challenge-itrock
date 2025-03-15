import { Request, Response, NextFunction } from "express";

const API_KEY = process.env.API_KEY || "default_api_key";

export default async function apiKeyMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const apiKey = req.header("x-api-key");
    if (!apiKey || apiKey !== process.env.API_KEY) {
      res.status(403).json({ message: "API Key inválida" });
      return;
    }
    next();
  } catch (error) {
    console.error("Error en API Key Middleware:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
