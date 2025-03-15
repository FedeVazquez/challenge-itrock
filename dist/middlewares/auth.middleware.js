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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tokenHeader = req.header("Authorization");
            if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
                res.status(401).json({ message: "Acceso denegado, token requerido" });
                return;
            }
            const token = tokenHeader.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
            req.user = decoded;
            next();
        }
        catch (error) {
            console.error("Error en autenticación:", error);
            res.status(401).json({ message: "Token inválido" });
        }
    });
}
