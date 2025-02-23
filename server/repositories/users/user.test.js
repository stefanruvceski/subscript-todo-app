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

  const mockUser = {
    query: jest.fn(() => mockQueryBuilder),
  };

  return mockUser;
});

const UserRepository = require("./user");
const User = require("../../models/users/user");

describe("UserRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user and return the inserted data", async () => {
    const userData = {
      username: "testuser",
      email: "test@example.com",
      password: "hashedpass",
    };
    const mockResult = { id: 1, ...userData };

    User.query().insert.mockReturnValue({
      returning: jest.fn().mockResolvedValue(mockResult),
    });

    const result = await UserRepository.create(userData);

    expect(User.query).toHaveBeenCalled();
    expect(User.query().insert).toHaveBeenCalledWith(userData);
    expect(User.query().insert().returning).toHaveBeenCalledWith("*");
    expect(result).toEqual(mockResult);
  });

  it("should find a user by ID", async () => {
    const userId = 1;
    const mockUser = {
      id: userId,
      username: "testuser",
      email: "test@example.com",
    };

    User.query().findById.mockResolvedValue(mockUser);

    const result = await UserRepository.findById(userId);

    expect(User.query).toHaveBeenCalled();
    expect(User.query().findById).toHaveBeenCalledWith(userId);
    expect(result).toEqual(mockUser);
  });

  it("should return null if user is not found by email", async () => {
    User.query().where().first.mockResolvedValue(null);

    const result = await UserRepository.findByEmail("nonexistent@example.com");

    expect(User.query).toHaveBeenCalled();
    expect(User.query().where).toHaveBeenCalledWith(
      "email",
      "nonexistent@example.com"
    );
    expect(User.query().where().first).toHaveBeenCalled();
    expect(result).toBeNull();
  });
});
