const mongoose = require("mongoose");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../app");
const Task = require("../../models/task.model");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: "test" });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  await Task.deleteMany();
});

describe("Task Integration", () => {
  it("should save a task to the database", async () => {
    const res = await request(app).post("/api/tasks").send({
      title: "Integration Task",
      description: "Test",
      completed: false,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Integration Task");

    const tasks = await Task.find();
    expect(tasks.length).toBe(1);
  });
});
