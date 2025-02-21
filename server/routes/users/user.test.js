const request = require("supertest");
const express = require("express");
const userRouter = require("./user");
const User = require("../../models/users/user");

jest.mock("../../models/users/user", () => {
  const mockQueryBuilder = {
    insert: jest.fn(),
    findById: jest.fn(),
    where: jest.fn().mockReturnThis(),
    first: jest.fn(),
    patchAndFetchById: jest.fn(),
    deleteById: jest.fn(),
    returning: jest.fn().mockReturnThis(),
    then: jest.fn(function (callback) {
      return callback(this.result);
    }),
  };

  return {
    query: jest.fn(() => mockQueryBuilder),
  };
});

jest.mock("bcrypt", () => ({
  hash: jest.fn().mockResolvedValue("hashedpass"),
}));

describe("User Router", () => {
  let app;

  beforeEach(() => {
    jest.clearAllMocks();
    app = express();
    app.use(express.json());
    app.use("/", userRouter);
  });
  it("POST / should create a user and return 201", async () => {
    const userData = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    };
    const mockUser = {
      id: 1,
      username: "testuser",
      email: "test@example.com",
      password: "hashedpass",
    };

    User.query().insert.mockReturnValue({
      returning: jest.fn().mockResolvedValue(mockUser),
    });
    User.query().where().first.mockResolvedValue(null);

    const response = await request(app).post("/").send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockUser);
    expect(User.query).toHaveBeenCalled();
    expect(User.query().insert).toHaveBeenCalledWith({
      username: "testuser",
      email: "test@example.com",
      password: "hashedpass",
    });
  });
});
