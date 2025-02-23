const express = require("express");
const validate = require("../../middlewares/validate");
const { groupSchema } = require("../../middlewares/validation_schema");
const groupController = require("../../controllers/groups/group");

const router = express.Router();

router.post("/", validate(groupSchema), groupController.createGroup);
router.get("/:id", groupController.getGroup);
router.get("/", groupController.getAllGroups);
router.put("/:id", groupController.updateGroup);
router.delete("/:id", groupController.deleteGroup);

module.exports = router;
