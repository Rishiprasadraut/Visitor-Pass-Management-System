exports.validateVisitor = (req, res, next) => {
    const { name, phone, email, purpose } = req.body;

    if (!name || !phone || !email || !purpose) {
        return res.status(400).json({ message: "All fields are required" })
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // Accept international phone formats: 10-15 digits with optional + and formatting
    if (!/^\+?[\d\s\-()]{10,15}$/.test(phone)) {
        return res.status(400).json({ message: "Invalid phone number format" });
    }
    next();
}