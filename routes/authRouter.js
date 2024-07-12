import { Router } from "express";
import { login, logout, register } from "../controllers/authControllers.js";
const router = Router();
import {
  validateLoginInput,
  validateRegistrationInput,
} from "../middleware/validationMiddleware.js";

router.post("/register", validateRegistrationInput, register);
router.post("/login", validateLoginInput, login);
router.get("/logout", logout);

export default router;
