const express = require("express");
const router = express.Router();
const userController = require("../../controllers/users");

const {
  getAllUsers,
  createUser,
  getUserProfile,
  deleteUser,
  updateUser,
  auditUser,
  getUnauditedUsers,
} = userController;

router.get("/getAllUsers", getAllUsers);
router.get("/getUserProfile", getUserProfile);
router.get("/getUnauditedUsers", getUnauditedUsers);
router.post("/createUser", createUser);
router.patch("/updateUser", updateUser);
router.patch("/auditUser", auditUser);
router.delete("/deleteUser", deleteUser);

module.exports = router;
