import { Router } from "express";
import { login, logout, register } from "../controllers/authControllers.js";
const router = Router();
import {
  validateLoginInput,
  validateRegistrationInput,
} from "../middleware/validationMiddleware.js";

import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { msg: "IP rate limit exceeded, retry in 15 minutes" },
});
router.post("/register", apiLimiter, validateRegistrationInput, register);
router.post("/login", apiLimiter, validateLoginInput, login);
router.get("/logout", logout);

export default router;
