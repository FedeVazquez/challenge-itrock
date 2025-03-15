import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import taskRoutes from "./routes/task.routes";
import authRoutes from "./routes/auth.routes";
import errorHandler from "./middlewares/error.middleware";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.use(errorHandler);

export default app;
