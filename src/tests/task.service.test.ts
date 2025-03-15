import * as taskService from "../../src/services/task.service";

jest.mock("../../src/models/task.model", () => ({
    find: jest.fn(() => Promise.resolve([
        { _id: "1", title: "Tarea 1", completed: false, userId: "1" },
        { _id: "2", title: "Tarea 2", completed: true, userId: "1" }
    ]))
}));

describe("Task Service", () => {
    it("Debe devolver un array de tareas", async () => {
        const tasks = await taskService.getTasks("1");
        expect(Array.isArray(tasks.tasks)).toBe(true);
        expect(tasks.tasks.length).toBe(2);
    });
})