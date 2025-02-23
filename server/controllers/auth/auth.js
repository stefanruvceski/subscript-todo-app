const authService = require("../../services/auth/auth");

class AuthController {
  async register(req, res) {
    try {
      const token = await authService.register(req.body);
      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const token = await authService.login(req.body);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();
