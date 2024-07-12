import { Router } from "express";
import {
  createJobs,
  deleteJob,
  getAllJobs,
  getSingleJob,
  jobUpdate,
  showStats,
} from "../controllers/jobControllers.js";
import {
  validateIdParam,
  validateJobInput,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";
const router = Router();

// >>> old way <<<<<
// router.get('/', getAllJobs)

// >>>> new way <<<<
router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJobs);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateIdParam, getSingleJob)
  .patch(checkForTestUser, validateIdParam, validateJobInput, jobUpdate)
  .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
