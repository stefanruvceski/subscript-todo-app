const express = require("express");
const groupMemberController = require("../../controllers/group_members/group_member");

const router = express.Router();

router.post("/", groupMemberController.createGroupMember);
router.get("/:id", groupMemberController.getGroupMember);
router.get("/group/:groupId", groupMemberController.getMembersByGroupId);
router.get("/user/:userId", groupMemberController.getGroupsByUserId);
router.get("/", groupMemberController.getAllGroupMembers);
router.put("/:id", groupMemberController.updateGroupMember);
router.delete("/:id", groupMemberController.deleteGroupMember);

module.exports = router;
