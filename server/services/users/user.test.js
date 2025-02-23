jest.mock("../../repositories/users/user");
jest.mock("bcrypt");

const UserRepository = require("../../repositories/users/user");
const bcrypt = require("bcrypt");
const UserService = require("./user");

describe("UserService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user with hashed password and return the user data", async () => {
    const userData = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    };
    const hashedPassword = "hashedpass";
    const mockUser = {
      id: 1,
      username: "testuser",
      email: "test@example.com",
      password: hashedPassword,
    };

    bcrypt.hash.mockResolvedValue(hashedPassword);
    UserRepository.findByEmail.mockResolvedValue(null);
    UserRepository.create.mockResolvedValue(mockUser);

    const result = await UserService.createUser(userData);

    expect(UserRepository.findByEmail).toHaveBeenCalledWith("test@example.com");
    expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
    expect(UserRepository.create).toHaveBeenCalledWith({
      username: "testuser",
      email: "test@example.com",
      password: hashedPassword,
    });
    expect(result).toEqual(mockUser);
  });

  it("should throw error if email already exists during creation", async () => {
    const userData = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    };
    const existingUser = { id: 1, email: "test@example.com" };

    UserRepository.findByEmail.mockResolvedValue(existingUser);

    await expect(UserService.createUser(userData)).rejects.toThrow(
      "Email already exists"
    );
    expect(UserRepository.findByEmail).toHaveBeenCalledWith("test@example.com");
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(UserRepository.create).not.toHaveBeenCalled();
  });

  // Test za getUserById
  it("should get user by ID and return the user data", async () => {
    const userId = 1;
    const mockUser = {
      id: userId,
      username: "testuser",
      email: "test@example.com",
    };

    UserRepository.findById.mockResolvedValue(mockUser);

    const result = await UserService.getUserById(userId);

    expect(UserRepository.findById).toHaveBeenCalledWith(userId);
    expect(result).toEqual(mockUser);
  });

  it("should throw error if user is not found by ID", async () => {
    const userId = 999;

    UserRepository.findById.mockResolvedValue(null);

    await expect(UserService.getUserById(userId)).rejects.toThrow(
      "User not found"
    );
    expect(UserRepository.findById).toHaveBeenCalledWith(userId);
  });

  // Test za getUserByEmail
  it("should get user by email and return the user data", async () => {
    const email = "test@example.com";
    const mockUser = { id: 1, username: "testuser", email };

    UserRepository.findByEmail.mockResolvedValue(mockUser);

    const result = await UserService.getUserByEmail(email);

    expect(UserRepository.findByEmail).toHaveBeenCalledWith(email);
    expect(result).toEqual(mockUser);
  });

  it("should throw error if user is not found by email", async () => {
    const email = "nonexistent@example.com";

    UserRepository.findByEmail.mockResolvedValue(null);

    await expect(UserService.getUserByEmail(email)).rejects.toThrow(
      "User not found"
    );
    expect(UserRepository.findByEmail).toHaveBeenCalledWith(email);
  });

  // Test za updateUser
  it("should update user with new data and hash password if provided", async () => {
    const userId = 1;
    const updateData = { username: "updateduser", password: "newpass123" };
    const hashedPassword = "newhashedpass";
    const mockUpdatedUser = {
      id: userId,
      username: "updateduser",
      password: hashedPassword,
    };

    bcrypt.hash.mockResolvedValue(hashedPassword);
    UserRepository.update.mockResolvedValue(mockUpdatedUser);

    const result = await UserService.updateUser(userId, updateData);

    expect(bcrypt.hash).toHaveBeenCalledWith("newpass123", 10);
    expect(UserRepository.update).toHaveBeenCalledWith(userId, {
      username: "updateduser",
      password: hashedPassword,
    });
    expect(result).toEqual(mockUpdatedUser);
  });

  it("should update user without hashing if password is not provided", async () => {
    const userId = 1;
    const updateData = { username: "updateduser" };
    const mockUpdatedUser = {
      id: userId,
      username: "updateduser",
      email: "test@example.com",
    };

    UserRepository.update.mockResolvedValue(mockUpdatedUser);

    const result = await UserService.updateUser(userId, updateData);

    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(UserRepository.update).toHaveBeenCalledWith(userId, updateData);
    expect(result).toEqual(mockUpdatedUser);
  });

  it("should throw error if user is not found during update", async () => {
    const userId = 999;
    const updateData = { username: "updateduser" };

    UserRepository.update.mockResolvedValue(null);

    await expect(UserService.updateUser(userId, updateData)).rejects.toThrow(
      "User not found"
    );
    expect(UserRepository.update).toHaveBeenCalledWith(userId, updateData);
  });

  // Test za deleteUser
  it("should delete user and return the deleted user data", async () => {
    const userId = 1;
    const mockDeletedUser = {
      id: userId,
      username: "testuser",
      email: "test@example.com",
    };

    UserRepository.delete.mockResolvedValue(mockDeletedUser);

    const result = await UserService.deleteUser(userId);

    expect(UserRepository.delete).toHaveBeenCalledWith(userId);
    expect(result).toEqual(mockDeletedUser);
  });

  it("should throw error if user is not found during deletion", async () => {
    const userId = 999;

    UserRepository.delete.mockResolvedValue(null);

    await expect(UserService.deleteUser(userId)).rejects.toThrow(
      "User not found"
    );
    expect(UserRepository.delete).toHaveBeenCalledWith(userId);
  });
});
