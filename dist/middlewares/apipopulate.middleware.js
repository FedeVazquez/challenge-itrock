"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = apiKeyMiddleware;
const API_KEY = process.env.API_KEY || "default_api_key";
function apiKeyMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const apiKey = req.header("x-api-key");
            if (!apiKey || apiKey !== process.env.API_KEY) {
                res.status(403).json({ message: "API Key inválida" });
                return;
            }
            next();
        }
        catch (error) {
            console.error("Error en API Key Middleware:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    });
}
