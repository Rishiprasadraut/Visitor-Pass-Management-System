const router = require("express").Router();

const controller = require("../../controllers/visitor/controller");
const authMiddlware = require("../../middlewares/auth/middleware");
const roleMiddleware = require("../../middlewares/auth/role");
const { validateVisitor } = require("../../middlewares/validate");

// ================= STATIC ROUTES FIRST =================

// DASHBOARD
router.get(
  "/dashboard",
  authMiddlware,
  roleMiddleware("ADMIN", "SECURITY"),
  controller.dashboardStats
);

// AUDIT LOGS
router.get(
  "/audit/logs",
  authMiddlware,
  roleMiddleware("ADMIN"),
  controller.getAuditLogs
);

// REPORTS
router.post(
  "/reports/status",
  authMiddlware,
  roleMiddleware("ADMIN", "SECURITY"),
  controller.visitorByStatus
);

router.post(
  "/reports/date",
  authMiddlware,
  roleMiddleware("ADMIN", "SECURITY"),
  controller.visitorByDate
);

// SEARCH
router.post(
  "/search",
  authMiddlware,
  roleMiddleware("ADMIN", "SECURITY"),
  controller.searchVisitors
);

// ================= CRUD ROUTES =================

// CREATE VISITOR
router.post(
  "/",
  authMiddlware,
  roleMiddleware("EMPLOYEE", "SECURITY"),
  validateVisitor,
  controller.createVisitor
);

// GET ALL VISITORS
router.get(
  "/",
  authMiddlware,
  roleMiddleware("ADMIN", "SECURITY"),
  controller.getVisitors
);

// APPROVE / REJECT
router.patch(
  "/:id/status",
  authMiddlware,
  roleMiddleware("ADMIN", "SECURITY"),
  controller.updateStatus
);

// CHECK-IN
router.patch(
  "/:id/check-in",
  authMiddlware,
  roleMiddleware("SECURITY"),
  controller.checkInVisitor
);

// CHECK-OUT
router.patch(
  "/:id/check-out",
  authMiddlware,
  roleMiddleware("SECURITY"),
  controller.checkOutVisitor
);

// HISTORY (DYNAMIC — LAST)
router.get(
  "/:id/history",
  authMiddlware,
  roleMiddleware("ADMIN", "SECURITY"),
  controller.getVisitorHistory
);

module.exports = router;
