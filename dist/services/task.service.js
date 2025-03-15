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
exports.populateTasks = exports.getTaskById = exports.createTask = exports.getTasks = void 0;
const axios_1 = __importDefault(require("axios"));
const task_model_1 = __importDefault(require("../models/task.model"));
const getTasks = (userId, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    if (!page || !limit) {
        const tasks = yield task_model_1.default.find({ userId });
        return { total: tasks.length, tasks };
    }
    const pageNumber = Math.max(1, Number(page));
    const limitNumber = Math.max(1, Number(limit));
    const skip = (pageNumber - 1) * limitNumber;
    const total = yield task_model_1.default.countDocuments({ userId });
    const tasks = yield task_model_1.default.find({ userId }).skip(skip).limit(limitNumber);
    return {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
        tasks,
    };
});
exports.getTasks = getTasks;
const createTask = (title, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const newTask = new task_model_1.default({ title, userId });
    return yield newTask.save();
});
exports.createTask = createTask;
const getTaskById = (taskId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_model_1.default.findById(taskId);
    if (!task) {
        throw { message: "Tarea no encontrada", status: 404 };
    }
    if (task.userId !== userId) {
        throw { message: "No tienes permiso para ver esta tarea", status: 403 };
    }
    return task;
});
exports.getTaskById = getTaskById;
const populateTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get("https://jsonplaceholder.typicode.com/todos");
    if (!response.data || response.data.length === 0) {
        throw { message: "No se encontraron tareas en la API externa", status: 404 };
    }
    const tasks = response.data.map(task => ({
        title: task.title,
        completed: task.completed,
        userId: String(task.userId),
    }));
    yield task_model_1.default.insertMany(tasks);
    return tasks;
});
exports.populateTasks = populateTasks;
