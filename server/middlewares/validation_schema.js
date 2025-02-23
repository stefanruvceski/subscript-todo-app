const Joi = require("joi");

const commentSchema = Joi.object({
  task_id: Joi.number().integer().positive().required(),
  content: Joi.string().min(5).max(255).required(),
  parent_comment_id: Joi.number().integer().positive().optional(),
});
const userCreateSchema = Joi.object({
  username: Joi.string().min(1).max(255).required(),
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(6).required(),
});

const userUpdateSchema = Joi.object({
  username: Joi.string().min(1).max(255),
  email: Joi.string().email().max(255),
  password: Joi.string().min(6),
});

const groupSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
});

const groupMemberSchema = Joi.object({
  group_id: Joi.number().integer().positive().required(),
  user_id: Joi.number().integer().positive().required(),
});

const taskSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().allow("").optional(),
  status: Joi.number().integer().min(0).max(2).default(0),
  assignee_id: Joi.number().integer().positive().allow(null),
  group_id: Joi.number().integer().positive().allow(null),
});

module.exports = {
  userCreateSchema,
  userUpdateSchema,
  groupSchema,
  groupMemberSchema,
  taskSchema,
  commentSchema,
};
