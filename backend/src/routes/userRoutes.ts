
import express from "express";
import { userAuth } from "../controllers/userController";

const router = express.Router();

router.post("/user-auth", userAuth);


export default router