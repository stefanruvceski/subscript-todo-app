const User = require("../../models/users/user");

class UserRepository {
  async create(userData) {
    return User.query().insert(userData).returning("*");
  }
  async findAll() {
    return User.query();
  }

  async findById(id) {
    return User.query().findById(id);
  }

  async findByEmail(email) {
    return User.query().where("email", email).first();
  }

  async update(id, userData) {
    return User.query().patchAndFetchById(id, userData);
  }

  async delete(id) {
    return User.query().deleteById(id);
  }
}

module.exports = new UserRepository();
