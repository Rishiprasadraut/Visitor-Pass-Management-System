exports.validateVisitor = (req, res, next) => {
    const { name, phone, purpose } = req.body;

    if (!name || !phone || !purpose) {
        return res.status(400).json({ message: "All fields are required" })
    }

    if (!/^\d{10}$/.test(phone)) {
        return res.status(400).json({ message: "Invalid phone number" });
    }
}