"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    PORT: process.env.PORT || 4000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/taskdb",
    JWT_SECRET: process.env.JWT_SECRET || "supersecreto",
    API_KEY: process.env.API_KEY || "supersecreta",
};
