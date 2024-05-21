import express from "express";
import { login, signup, updateUser } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

router.post("/update-user", auth, updateUser);


export { router as UserRoute };
