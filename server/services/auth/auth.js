const userRepository = require("../../repositories/users/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService {
  async register({ username, email, password }) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { username, email, password: hashedPassword };

    const user = await userRepository.create(userData);
    return this.generateToken(user);
  }

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    return this.generateToken(user);
  }

  generateToken(user) {
    const payload = { id: user.id, username: user.username };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  }
}

module.exports = new AuthService();
