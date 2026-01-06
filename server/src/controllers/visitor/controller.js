const Visitor = require("../../models/Visitor");

// create visitor (security / Employee)

exports.createVisitor = async (req, res) => {
    try {
        const { name, phone, email, purpose } = req.body;

        const visitor = await Visitor.create({
            name,
            phone,
            email,
            purpose,
            host: req.user._id,
        })
        res.status(201).json({ message: "Visitor created successfully", visitor, });
    } catch (err) {
        res.status(500).json({ message: "Error creating visitor" });
    }
};

// get all visitors

exports.getVisitors = async (req, res) => {
    try {
        const visitor = await Visitor.find()
            .populate("host", "name email role")
            .sort({ createdAt: -1 });

        res.json({ visitor });
    } catch (err) {
        res.status(500).json({ message: "Error getting visitors" });
    }
};

// APPROVE / REJECT VISITOR (ADMIN / SECURITY)

exports.updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const allowed = ["APPROVED", "REJECTED"];
        if (!allowed.includes(status)) {
            return res.status(400).json({ message: "Invalid Status" });
        }

        const visitor = await Visitor.findById(id);
        if (!visitor) {
            return res.status(404).json({ message: "Visitor not Found" });
        }

        if (visitor.status !== "PENDING") {
            return res.status(400).json({ message: "Action not Allowed..." });

        }
        visitor.status = status;
        await visitor.save();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error Updating Status" });
    }
}

// CHECK-IN VISITOR (SECURITY)

exports.checkInVisitor = async (req, res) => {
    const { id } = req.params;

    try {
        const visitor = await Visitor.findById(id);
        if (!visitor) {
            return res.status(404).json({ message: "Visitor not Found" });
        }

        if (visitor.status !== "APPROVED") {
            return res.status(400).json({ message: "Visitor not Approved" });
        }

        visitor.status = "CHECKED_IN";
        await visitor.save();

        res.json({ message: "Visitor Checked in", visitor });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error Check In" });
    }
}

// CHECK-OUT VISITOR (SECURITY)

exports.checkOutVisitor = async (req, res) => {
    const { id } = req.params;

    try {
        const visitor = await Visitor.findById(id);
        if (!visitor) {
            return res.status(404).json({ message: "Visitor not Found" });
        }

        if (visitor.status !== "CHECKED_IN") {
            return res.status(400).json({ message: "Visitor not Checked In" });
        }

        visitor.status = "CHECKED_OUT";
        await visitor.save();

        res.json({ message: "Visitor Checked Out", visitor });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error Check Out" });
    }
};

exports.dashboardStats = async (req, res) => {
    try {
        const total = await Visitor.countDocuments();

        const pending = await Visitor.countDocuments({ status: "PENDING" });
        const approved = await Visitor.countDocuments({ status: "APPROVED" });
        const rejected = await Visitor.countDocuments({ status: "REJECTED" });
        const checkIn = await Visitor.countDocuments({ status: "CHECKED_IN" });
        const checkOut = await Visitor.countDocuments({ status: "CHECKED_OUT" });

        const today = new Date();
        today.setHours(0, 0, 0, 0)


        const todayVisitors = await Visitor.countDocuments({
            createdAt: { $gte: today }
        });


        res.json({
            total,
            pending,
            approved,
            rejected,
            checkIn,
            checkOut,
            todayVisitors
        })
    } catch (err) {
        res.status(500).json({ message: "Dashboard data error" });
    }
};

exports.visitorByStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        const visitors = await Visitor.find({ status }).sort({ createdAt: -1 });
        res.json({ visitors });

    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Error getting visitors by status" })
    }
};

exports.visitorByDate = async (req, res) => {
    const { from, to } = req.body;
    try {
        const visitors = await Visitor.find({
            createdAt: {
                $gte: new Date(from),
                $lte: new Date(to)
            }

        });
        res.json({ visitors });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error getting visitors by date" });
    }
}
