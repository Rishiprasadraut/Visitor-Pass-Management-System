const router = require('express').Router();
const authMiddleware = require("../../middlewares/auth/middleware");
const roleMiddleware = require("../../middlewares/auth/role");


const {
    register, login, visitorRegister
} = require("../../controllers/auth/controller");

//public

router.post("/login", login);

// Public Visitor Self-Registration
router.post("/visitor/register", visitorRegister);

//protected - ADMIN only (security fix: prevent unauthorized user registration)
router.post(
    "/register",
    authMiddleware,
    roleMiddleware(["ADMIN"]),
    register
);


//profile router

router.get("/profile",authMiddleware,(req,res)=>{
    res.json(req.user);
});


// protected - ADMIN only (TEST ENDPOINT - for testing role-based access)

router.get(
    "/admin",
    authMiddleware,
    roleMiddleware(["ADMIN"]),
    (req, res) => {
        res.json({ message: "Welcome Admin" })
    }
);

// protected - ADMIN & SECURITY (TEST ENDPOINT - for testing multi-role access)

router.get(
    "/admin-security",
    authMiddleware,
    roleMiddleware(["ADMIN", "SECURITY"]),
    (req, res) => {
        res.json({ message: "Welcome Admin & Security" })
    }
);

module.exports = router;