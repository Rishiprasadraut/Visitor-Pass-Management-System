const router = require('express').Router();
const authMiddleware = require("../../middlewares/auth/middleware");
const roleMiddleware = require("../../middlewares/auth/role");


const {
    register, login,
} = require("../../controllers/auth/controller");

//public

router.post("/register", register);
router.post("/login", login);


//profile router

router.get("/profile",authMiddleware,(req,res)=>{
    res.json(req.user);
});


// protected - ADMIN only

router.get(
    "/admin",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {
        res.json({ message: "Welcome Admin" })
    }
);

// protected - ADMIN & SECURITY

router.get(
    "/admin-security",
    authMiddleware,
    roleMiddleware(["admin", "security"]),
    (req, res) => {
        res.json({ message: "Welcome Admin & Security" })
    }
);

module.exports = router;