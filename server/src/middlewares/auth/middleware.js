const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized access" })
    }

    const token = authHeader.split(" ")[1];

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }

        req.user = user;
        next();

    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" })
    }

}

module.exports = authMiddleware;