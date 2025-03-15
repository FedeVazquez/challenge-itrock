import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import * as taskService from "../services/task.service";

export const getTasks = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;

    if (page !== undefined && (page < 1 || (limit !== undefined && limit < 1))) {
      res.status(400).json({ message: "Los parámetros page y limit deben ser mayores a 0" });
      return;
    }

    const result = await taskService.getTasks(req.user!.id, page, limit);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { title } = req.body;
    const newTask = await taskService.createTask(title, req.user!.id);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const task = await taskService.getTaskById(id, req.user!.id);
    res.json(task);
  } catch (error) {
    next(error);
  }
}

export const populateTasks = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const tasks = await taskService.populateTasks();
    res.status(201).json({ message: "Tareas importadas correctamente", tasks });
  } catch (error) {
    next(error);
  }
};
