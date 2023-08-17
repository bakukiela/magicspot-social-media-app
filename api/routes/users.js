import express from "express";
import { getUser, updateUser, getUsers } from "../controllers/user.js";

const router = express.Router();

router.get("/find/:userId", getUser);
router.put("/api", updateUser);
router.get("/", getUsers);

export default router;
