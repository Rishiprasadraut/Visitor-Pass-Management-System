exports.validateVisitor = (req, res, next) => {
    const { name, phone, email, purpose } = req.body;

    if (!name || !phone || !email || !purpose) {
        return res.status(400).json({ message: "All fields are required" })
    }

    // Accept international phone formats: 10-15 digits with optional + and formatting
    if (!/^\+?[\d\s\-()]{10,15}$/.test(phone)) {
        return res.status(400).json({ message: "Invalid phone number format" });
    }
    next();
}