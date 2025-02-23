const request = require("supertest");
const express = require("express");
const userRoutes = require("./user");
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

describe("userRoutes with mocked User model", () => {
  let app;

  beforeEach(() => {
    jest.clearAllMocks();
    app = express();
    app.use(express.json());
    app.use("/", userRoutes);
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

  it("POST / should return 400 if email exists", async () => {
    const userData = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    };
    const existingUser = { id: 1, email: "test@example.com" };

    User.query().where().first.mockResolvedValue(existingUser);

    const response = await request(app).post("/").send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Email already exists" });
    expect(User.query().where).toHaveBeenCalledWith(
      "email",
      "test@example.com"
    );
  });

  it("GET /:id should return user data with 200", async () => {
    const mockUser = { id: 1, username: "testuser", email: "test@example.com" };

    User.query().findById.mockResolvedValue(mockUser);

    const response = await request(app).get("/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
    expect(User.query().findById).toHaveBeenCalledWith("1");
  });

  it("GET /:id should return 404 if user not found", async () => {
    User.query().findById.mockResolvedValue(null);

    const response = await request(app).get("/999");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "User not found" });
    expect(User.query().findById).toHaveBeenCalledWith("999");
  });

  it("PUT /:id should update user and return 200", async () => {
    const updateData = { username: "updateduser" };
    const mockUpdatedUser = {
      id: 1,
      username: "updateduser",
      email: "test@example.com",
    };

    User.query().patchAndFetchById.mockResolvedValue(mockUpdatedUser);

    const response = await request(app).put("/1").send(updateData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUpdatedUser);
    expect(User.query().patchAndFetchById).toHaveBeenCalledWith(
      "1",
      updateData
    );
  });

  it("PUT /:id should return 400 if user not found", async () => {
    const updateData = { username: "updateduser" };

    User.query().patchAndFetchById.mockResolvedValue(null);

    const response = await request(app).put("/999").send(updateData);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "User not found" });
    expect(User.query().patchAndFetchById).toHaveBeenCalledWith(
      "999",
      updateData
    );
  });

  it("DELETE /:id should delete user and return 200", async () => {
    const mockDeletedUser = {
      id: 1,
      username: "testuser",
      email: "test@example.com",
    };

    User.query().deleteById.mockReturnValue({
      returning: jest.fn().mockResolvedValue(mockDeletedUser),
    });

    const response = await request(app).delete("/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDeletedUser);
    expect(User.query().deleteById).toHaveBeenCalledWith("1");
  });

  it("DELETE /:id should return 404 if user not found", async () => {
    User.query().deleteById.mockReturnValue({
      returning: jest.fn().mockResolvedValue(null),
    });

    const response = await request(app).delete("/999");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "User not found" });
    expect(User.query().deleteById).toHaveBeenCalledWith("999");
  });
});
