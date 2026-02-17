const router = require("express").Router();

const controller = require("../../controllers/visitor/controller");
const authMiddleware = require("../../middlewares/auth/middleware");
const roleMiddleware = require("../../middlewares/auth/role");
const { validateVisitor } = require("../../middlewares/validate");
const upload = require("../../config/multer");

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
  roleMiddleware(["ADMIN", "SECURITY", "EMPLOYEE"]),
  controller.searchVisitors
);

// EXPORT TO CSV
router.get(
  "/export/csv",
  authMiddleware,
  roleMiddleware(["ADMIN", "SECURITY"]),
  controller.exportVisitors
);

// VALIDATE QR CODE
router.post(
  "/validate-qr",
  authMiddleware,
  roleMiddleware(["SECURITY"]),
  controller.validateQR
);

// ================= CRUD ROUTES =================

// CREATE VISITOR
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["EMPLOYEE", "SECURITY"]),
  upload.single('photo'), // Add photo upload
  validateVisitor,
  controller.createVisitor
);

// GET ALL VISITORS
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN", "SECURITY", "EMPLOYEE"]),
  controller.getVisitors
);

// APPROVE / REJECT
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware(["ADMIN", "SECURITY", "EMPLOYEE"]),
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

// MY DIGITAL PASS (VISITOR only)
router.get(
  "/mypass",
  authMiddleware,
  roleMiddleware(["VISITOR"]),
  controller.getMyPass
);

// DOWNLOAD PDF BADGE
router.get(
  "/:id/badge",
  authMiddleware,
  roleMiddleware(["ADMIN", "SECURITY", "VISITOR"]),
  controller.downloadBadge
);

// HISTORY (DYNAMIC — LAST)
router.get(
  "/:id/history",
  authMiddleware,
  roleMiddleware(["ADMIN", "SECURITY"]),
  controller.getVisitorHistory
);

module.exports = router;
