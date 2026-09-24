import { Router } from "express";
import { IncidentController } from "../controllers/incident.controller";
import { validateIdMiddleware } from "../middlewares/validate-id.middleware";
import { validateIncidentMiddleware } from "../middlewares/validate-incident.middleware";
import { validatePriorityMiddleware } from "../middlewares/validate-priority.middleware";
import { validateTimeMiddleware } from "../middlewares/validate-time.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Router();
const controller = new IncidentController();

router.get("/stats", controller.getStats);
router.get("/critical", controller.getCritical);
router.get("/pending", controller.getPending);

router.get("/", controller.getAll);
router.get("/:id", validateIdMiddleware, controller.getById);

router.post(
  "/",
  authMiddleware,
  validateIncidentMiddleware,
  validatePriorityMiddleware,
  validateTimeMiddleware,
  controller.create
);

router.put(
  "/:id",
  validateIdMiddleware,
  validatePriorityMiddleware,
  validateTimeMiddleware,
  controller.update
);

router.patch(
  "/:id/status",
  validateIdMiddleware,
  controller.updateStatus
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validateIdMiddleware,
  controller.remove
);

export default router;
