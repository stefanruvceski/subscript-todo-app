const express = require("express");
const validate = require("../../middlewares/validate");
const {
  userCreateSchema,
  userUpdateSchema,
} = require("../../middlewares/validation_schema");
const authController = require("../../controllers/auth/auth");
const router = express.Router();

router.post("/register", validate(userCreateSchema), authController.register);
router.post("/login", validate(userUpdateSchema), authController.login);

module.exports = router;
