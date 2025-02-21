const userService = require("../../services/users/user");

class UserController {
  async createUser(req, res) {
    try {
      const { body } = req;
      const user = await userService.createUser(body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const user = await userService.updateUser(id, body);
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      res.status(204).json();
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new UserController();
