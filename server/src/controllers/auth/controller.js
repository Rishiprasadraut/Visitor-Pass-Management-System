const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")


exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const userExists = await User.findOne({ email });
        if (userExists)
            return res.status(400).json({ message: "User already Exists" })

        // Password strength validation
        if (password.length < 8) {
            return res.status(400).json({ 
                message: "Password must be at least 8 characters" 
            });
        }

        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            return res.status(400).json({ 
                message: "Password must contain uppercase, lowercase, and number" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        })

        res.status(201).json({
            message: "User registered successfully",
            userId: user._id,
        })

    } catch (err) {
        console.error(err, "error in register")
        res.status(500).json({ message: "Server error during registration" });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found" })

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" })

        const token = jwt.sign({ userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token })

    } catch (err) {
        console.error(err, 'Error in login')
        res.status(500).json({ message: "Server error during login" });
    }
}
// Visitor Self-Registration (Public)
exports.visitorRegister = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const userExists = await User.findOne({ email });
        if (userExists)
            return res.status(400).json({ message: "User already exists" })

        // Password strength validation
        if (password.length < 8) {
            return res.status(400).json({ 
                message: "Password must be at least 8 characters" 
            });
        }

        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            return res.status(400).json({ 
                message: "Password must contain uppercase, lowercase, and number" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'VISITOR', // Force VISITOR role for self-registration
        })

        res.status(201).json({
            message: "Visitor account created successfully",
            userId: user._id,
        })

    } catch (err) {
        console.error(err, "error in visitor registration")
        res.status(500).json({ message: "Server error during registration" });
    }
}
