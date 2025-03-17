import app from "./app";
import mongoose from "mongoose";

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://admin:adminpassword@mongo:27017/taskdb?authSource=admin";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("🚀 MongoDB conectado");
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  })
  .catch((err) => console.error("Error conectando a MongoDB:", err));
