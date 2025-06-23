const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Task = require('../../models/task.model');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: 'apitest' });
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Task.create({ title: 'Sample Task', description: 'desc', completed: false });
});

afterEach(async () => {
  await Task.deleteMany();
});

describe('GET /api/tasks', () => {
  it('should return all tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});

describe('GET /api/tasks/:id', () => {
  it('should return a task by id', async () => {
    const task = await Task.findOne();
    const res = await request(app).get(`/api/tasks/${task._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Sample Task');
  });
});
