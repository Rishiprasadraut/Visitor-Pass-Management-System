const router = require('express').Router();

const controller = require("../../controllers/visitor/controller");
const authMiddlware = require("../../middlewares/auth/middleware");
const roleMiddleware = require("../../middlewares/auth/role");
const { validateVisitor } = require('../../middlewares/validate');


// create visitor

router.post("/", authMiddlware, roleMiddleware("EMPLOYEE", "SECURITY"),
    controller.createVisitor);


// get all visitors

router.get("/", authMiddlware, roleMiddleware("ADMIN", "SECURITY"),
    controller.getVisitors);


// APPROVE / REJECT (ADMIN / SECURITY)

router.patch("/:id/status", authMiddlware, roleMiddleware("ADMIN", "SECURITY"),
    controller.updateStatus);


// CHECK-IN (SECURITY)

router.patch("/:id/check-in", authMiddlware, roleMiddleware("SECURITY"),
    controller.checkInVisitor);


// CHECKED_OUT (SECURITY)  

router.patch("/:id/check-out", authMiddlware, roleMiddleware("SECURITY"),
    controller.checkOutVisitor);


// dashboard Details

router.post('/dashboard-stats', authMiddlware, roleMiddleware("ADMIN", "SECURITY"),
    controller.dashboardStats);



//STATUS-WISE REPORT API

router.post("/reports/status", authMiddlware, roleMiddleware("ADMIN", "SECURITY"),
    controller.visitorByStatus);


// reports Date routes    

router.post("/reports/date", authMiddlware, roleMiddleware("ADMIN", "SECURITY"),
    controller.visitorByDate);

// search + pagination

router.post("/search", authMiddlware, roleMiddleware("ADMIN", "SECURITY"),
    controller.searchVisitors);


//for History

router.get("/:id/history", authMiddlware, roleMiddleware("ADMIN", "SECURITY"),
    controller.getVisitorHistory);


/* The code `router.get("/audit/logs", authMiddlware, roleMiddleware("ADMIN"),
controller.getAuditLogs)` is defining a route for handling GET requests to "/audit/logs". This route
requires authentication middleware (`authMiddlware`) to ensure that the user is authenticated. It
also requires role middleware (`roleMiddleware`) with the role "ADMIN" to restrict access to only
users with the "ADMIN" role. */

router.get("/audit/logs", authMiddlware, roleMiddleware("ADMIN"),
    controller.getAuditLogs);



router.post("/", authMiddlware, roleMiddleware("EMPLOYEE", "SECURITY"), validateVisitor,
    controller.createVisitor);

module.exports = router;