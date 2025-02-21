const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "email"],
      properties: {
        id: { type: "integer" },
        username: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", format: "email", maxLength: 255 },
        password: { type: "string", minLength: 1, maxLength: 255 },
        created_at:{type:"string", format:"date-time"},
        updated_at:{type:"string", format:"date-time"},
      },
    };
  }
}

module.exports = User;
