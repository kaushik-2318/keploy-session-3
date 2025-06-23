const { createTask } = require("../../controllers/task.controller");
const Task = require("../../models/task.model");

jest.mock("../../models/task.model");

describe("createTask Controller", () => {
  it("should create a new task and return 201", async () => {
    const req = {
      body: { title: "Test Task", description: "Test Desc", completed: false },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    Task.create.mockResolvedValue(req.body);

    await createTask(req, res);

    expect(Task.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });
});
