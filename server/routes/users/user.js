const express = require("express");
const validate = require("../../middlewares/validate");
const {
  userCreateSchema,
  userUpdateSchema,
} = require("../../middlewares/validation_schema");
const userController = require("../../controllers/users/user");

const router = express.Router();

router.post("/", validate(userCreateSchema), userController.createUser);
router.get("/:id", userController.getUser);
router.put("/:id", validate(userUpdateSchema), userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
