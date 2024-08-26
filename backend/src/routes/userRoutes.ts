
import express from "express";
import { userAuth } from "../controllers/userController";

const router = express.Router();

router.get("/user-auth", userAuth);


export default router