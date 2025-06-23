const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { connectDB } = require("../../config/config");

describe("Database Connection", () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGO_URI = mongoServer.getUri();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it("should connect to in-memory MongoDB", async () => {
    await connectDB();
    expect(mongoose.connection.readyState).toBe(1); // 1 = connected
  });
});
