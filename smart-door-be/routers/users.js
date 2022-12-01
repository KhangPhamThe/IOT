import express from "express";
import {
  createAccount,
  loginAccount,
  getAllUsers,
  getUserProfile,
} from "../controllers/users.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/admin/create-account", verifyToken ,createAccount);
router.get("/admin/all-users", verifyToken, getAllUsers);
router.post("/login", loginAccount);
router.get('/get-user-profile', verifyToken ,getUserProfile);

export default router;
