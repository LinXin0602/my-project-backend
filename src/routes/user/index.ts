import express from "express";
import {
  getAllUsers,
  createUser,
  getUserProfile,
  deleteUser,
  updateUser,
  auditUser,
  getUnauditedUsers,
} from "../../controllers/users"; // 加上 .js 擴展名

const router = express.Router();

router.get("/getAllUsers", getAllUsers);
router.get("/getUserProfile", getUserProfile);
router.get("/getUnauditedUsers", getUnauditedUsers);
router.post("/createUser", createUser);
router.patch("/updateUser", updateUser);
router.patch("/auditUser", auditUser);
router.delete("/deleteUser", deleteUser);

export default router;
