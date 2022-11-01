import express from "express";
import {
  createAccount,
  loginAccount,
  getAllUsers,
} from "../controllers/users.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/admin/create-account", createAccount);
router.get("/admin/all-users", verifyToken, getAllUsers);
router.post("/login", loginAccount);

export default router;
