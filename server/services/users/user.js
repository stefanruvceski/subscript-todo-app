const userRepository = require("../../repositories/users/user");
const bcrypt = require("bcrypt");
class UserService {
  async createUser({ username, email, password }) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { username, email, password: hashedPassword };

    return userRepository.create(userData);
  }

  async getUserById(id) {
    return userRepository.findById(id);
  }

  async getUserByEmail(email) {
    return userRepository.findByEmail(email);
  }

  async updateUser(id, userData) {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    const updatedUser = await userRepository.update(id, userData);

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  }

  async deleteUser(id) {
    const deletedUser = await userRepository.delete(id);
    if (!deletedUser) {
      throw new Error("User not found");
    }

    return deletedUser;
  }
}

module.exports = new UserService();
