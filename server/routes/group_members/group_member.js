const express = require("express");
const groupMemberController = require("../../controllers/group_members/group_member");

const router = express.Router();

router.post("/", groupMemberController.addMember);
router.get("/:groupId/members", groupMemberController.getMembers);
router.delete("/:groupId/members/:userId", groupMemberController.removeMember);

module.exports = router;
