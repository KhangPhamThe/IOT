import express from "express";
import { createAccount } from "../controllers/users.js";

const router = express.Router();

router.post('/admin/create-account', createAccount);

export default router;