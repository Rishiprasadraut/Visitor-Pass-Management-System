const router = require('express').Router();

const controller = require("../../controllers/visitor/controller");
const authMiddlware = require("../../middlewares/auth/middleware");
const roleMiddleware = require("../../middlewares/auth/role");


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

module.exports = router;