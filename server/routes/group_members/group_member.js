const express = require("express");
const validate = require("../../middlewares/validate");
const { groupMemberSchema } = require("../../middlewares/validation_schema");
const groupMemberController = require("../../controllers/group_members/group_member");

const router = express.Router();

router.post("/", validate(groupMemberSchema), groupMemberController.addMember);
router.get("/:groupId/members", groupMemberController.getMembers);
router.delete("/:groupId/members/:userId", groupMemberController.removeMember);

module.exports = router;
