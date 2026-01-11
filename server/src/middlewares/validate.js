exports.validateVisitor = (req, res, next) => {
    const { name, phone, email,purpose } = req.body;

    if (!name || !phone || !email || !purpose) {
        return res.status(400).json({ message: "All fields are required" })
    }

    if (!/^\d{10}$/.test(phone)) {
        return res.status(400).json({ message: "Invalid phone number" });
    }
    next();
}