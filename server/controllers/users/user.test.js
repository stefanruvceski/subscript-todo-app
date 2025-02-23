jest.mock("../../services/users/user");

const UserService = require("../../services/users/user");
const UserController = require("./user");

const mockRequest = (body = {}, params = {}) => ({
  body,
  params,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

describe("UserController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user and return 201 with user data", async () => {
    const mockUser = { id: 1, username: "testuser", email: "test@example.com" };
    const req = mockRequest({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });
    const res = mockResponse();

    UserService.createUser.mockResolvedValue(mockUser);

    await UserController.createUser(req, res);

    expect(UserService.createUser).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it("should return 400 if createUser throws an error", async () => {
    const req = mockRequest({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });
    const res = mockResponse();

    UserService.createUser.mockRejectedValue(new Error("Email already exists"));

    await UserController.createUser(req, res);

    expect(UserService.createUser).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Email already exists" });
  });

  it("should get a user by ID and return 200 with user data", async () => {
    const mockUser = { id: 1, username: "testuser", email: "test@example.com" };
    const req = mockRequest({}, { id: "1" });
    const res = mockResponse();

    UserService.getUserById.mockResolvedValue(mockUser);

    await UserController.getUser(req, res);

    expect(UserService.getUserById).toHaveBeenCalledWith("1");
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it("should return 404 if getUser throws an error", async () => {
    const req = mockRequest({}, { id: "999" });
    const res = mockResponse();

    UserService.getUserById.mockRejectedValue(new Error("User not found"));

    await UserController.getUser(req, res);

    expect(UserService.getUserById).toHaveBeenCalledWith("999");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
  });

  it("should update a user and return 200 with updated user data", async () => {
    const mockUpdatedUser = {
      id: 1,
      username: "updateduser",
      email: "test@example.com",
    };
    const req = mockRequest({ username: "updateduser" }, { id: "1" });
    const res = mockResponse();

    UserService.updateUser.mockResolvedValue(mockUpdatedUser);

    await UserController.updateUser(req, res);

    expect(UserService.updateUser).toHaveBeenCalledWith("1", req.body);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockUpdatedUser);
  });

  it("should return 400 if updateUser throws an error", async () => {
    const req = mockRequest({ username: "updateduser" }, { id: "999" });
    const res = mockResponse();

    UserService.updateUser.mockRejectedValue(new Error("User not found"));

    await UserController.updateUser(req, res);

    expect(UserService.updateUser).toHaveBeenCalledWith("999", req.body);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
  });

  it("should delete a user and return 200 with deleted user data", async () => {
    const mockDeletedUser = {
      id: 1,
      username: "testuser",
      email: "test@example.com",
    };
    const req = mockRequest({}, { id: "1" });
    const res = mockResponse();

    UserService.deleteUser.mockResolvedValue(mockDeletedUser);

    await UserController.deleteUser(req, res);

    expect(UserService.deleteUser).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockDeletedUser);
  });

  it("should return 404 if deleteUser throws an error", async () => {
    const req = mockRequest({}, { id: "999" });
    const res = mockResponse();

    UserService.deleteUser.mockRejectedValue(new Error("User not found"));

    await UserController.deleteUser(req, res);

    expect(UserService.deleteUser).toHaveBeenCalledWith("999");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
  });
});
