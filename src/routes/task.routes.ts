import { Router } from "express";
import { getTasks, createTask, getTaskById, populateTasks, } from "../controllers/task.controller";
import authMiddleware from "../middlewares/auth.middleware";
import apiKeyMiddleware from "../middlewares/apipopulate.middleware";

const router = Router();

router.get("/populate", apiKeyMiddleware, populateTasks);
router.get("/", authMiddleware, getTasks);
router.get("/:id", authMiddleware, getTaskById);
router.post("/", authMiddleware, createTask);




export default router;
