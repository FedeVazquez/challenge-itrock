import axios from "axios";
import Task from "../models/task.model";

interface TaskExternal {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const getTasks = async (userId: string, page?: number, limit?: number): Promise<{ total: number; tasks: any[]; page?: number; limit?: number; totalPages?: number }> => {
  if (!page || !limit) {
    const tasks = await Task.find({ userId });
    return { total: tasks.length, tasks };
  }

  const pageNumber = Math.max(1, Number(page));
  const limitNumber = Math.max(1, Number(limit));
  const skip = (pageNumber - 1) * limitNumber;

  const total = await Task.countDocuments({ userId });
  const tasks = await Task.find({ userId }).skip(skip).limit(limitNumber);

  return {
    total,
    page: pageNumber,
    limit: limitNumber,
    totalPages: Math.ceil(total / limitNumber),
    tasks,
  };
}

export const createTask = async (title: string, userId: string) => {
  const newTask = new Task({ title, userId });
  return await newTask.save();
}

export const getTaskById = async (taskId: string, userId: string) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw { message: "Tarea no encontrada", status: 404 };
  }

  if (task.userId !== userId) {
    throw { message: "No tienes permiso para ver esta tarea", status: 403 };
  }

  return task;
}

export const populateTasks = async () => {
  const response = await axios.get<TaskExternal[]>("https://jsonplaceholder.typicode.com/todos");

  if (!response.data || response.data.length === 0) {
    throw { message: "No se encontraron tareas en la API externa", status: 404 };
  }

  const tasks = response.data.map(task => ({
    title: task.title,
    completed: task.completed,
    userId: String(task.userId),
  }));

  await Task.insertMany(tasks);
  return tasks;
}
