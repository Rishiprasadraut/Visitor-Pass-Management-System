const router = require("express").Router();

const controller = require("../../controllers/visitor/controller");
const authMiddleware = require("../../middlewares/auth/middleware");
const roleMiddleware = require("../../middlewares/auth/role");
const { validateVisitor } = require("../../middlewares/validate");

// ================= STATIC ROUTES FIRST =================

// DASHBOARD
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware(["ADMIN", "SECURITY"]),
  controller.dashboardStats
);

// AUDIT LOGS
router.get(
  "/audit/logs",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  controller.getAuditLogs
);

// REPORTS
router.post(
  "/reports/status",
  authMiddleware,
  roleMiddleware(["ADMIN", "SECURITY"]),
  controller.visitorByStatus
);

router.post(
  "/reports/date",
  authMiddleware,
  roleMiddleware(["ADMIN", "SECURITY"]),
  controller.visitorByDate
);

// SEARCH
router.post(
  "/search",
  authMiddleware,
  roleMiddleware(["ADMIN", "SECURITY"]),
  controller.searchVisitors
);

// ================= CRUD ROUTES =================

// CREATE VISITOR
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["EMPLOYEE", "SECURITY"]),
  validateVisitor,
  controller.createVisitor
);

// GET ALL VISITORS
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN", "SECURITY"]),
  controller.getVisitors
);

// APPROVE / REJECT
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware(["ADMIN", "SECURITY"]),
  controller.updateStatus
);

// CHECK-IN
router.patch(
  "/:id/check-in",
  authMiddleware,
  roleMiddleware(["SECURITY"]),
  controller.checkInVisitor
);

// CHECK-OUT
router.patch(
  "/:id/check-out",
  authMiddleware,
  roleMiddleware(["SECURITY"]),
  controller.checkOutVisitor
);

// UPDATE VISITOR DETAILS (ADMIN only)
router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  controller.updateVisitor
);

// DELETE VISITOR (ADMIN only)
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  controller.deleteVisitor
);

// HISTORY (DYNAMIC — LAST)
router.get(
  "/:id/history",
  authMiddleware,
  roleMiddleware(["ADMIN", "SECURITY"]),
  controller.getVisitorHistory
);

module.exports = router;
