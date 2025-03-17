"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://admin:adminpassword@mongo:27017/taskdb?authSource=admin";
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    console.log("🚀 MongoDB conectado");
    app_1.default.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
})
    .catch((err) => console.error("Error conectando a MongoDB:", err));
