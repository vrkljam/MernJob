import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userControllers.js";
import { validateUserInput } from "../middleware/validationMiddleware.js";
import {
  authorizePermissions,
  checkForTestUser,
} from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", [
  authorizePermissions("admin"),
  getApplicationStats,
]);
router.patch(
  "/update-user",
  checkForTestUser,
  upload.single("avatar"),
  validateUserInput,
  updateUser
);

export default router;
