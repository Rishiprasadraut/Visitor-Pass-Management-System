const Visitor = require("../../models/Visitor");
const User = require("../../models/User");
const logAudit = require("../../utils/auditLogger");
const AuditLog = require("../../models/AuditLog");
const { generateQRCode } = require("../../utils/qrGenerator");
const { sendEmail, emailTemplates } = require("../../utils/emailService");
const { generateVisitorBadge } = require("../../utils/pdfGenerator");
const { exportToCSV } = require("../../utils/csvExporter");


// create visitor (security / Employee)

exports.createVisitor = async (req, res) => {
    try {
        const { name, phone, email, purpose } = req.body;

        const visitor = await Visitor.create({
            name,
            phone,
            email,
            purpose,
            photo: req.file ? req.file.path : null, // Save photo path if uploaded
            host: req.user._id,
            history: [
                {
                    status: "PENDING",
                    changedBy: req.user._id
                }
            ]
        })

        // Send email notification to host about new visitor request
        if (req.user.email) {
            await sendEmail({
                to: req.user.email,
                subject: 'New Visitor Request',
                html: emailTemplates.newVisitorRequest(req.user.email, name, purpose)
            });
        }

        res.status(201).json({ message: "Visitor created successfully", visitor, });
    } catch (err) {
        console.error("Create visitor error:", err);
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

        const oldStatus = visitor.status;

        visitor.status = status;

        visitor.history.push({
            status,
            changedBy: req.user._id
        });

        // Generate QR code if approved
        if (status === "APPROVED") {
            const qrData = JSON.stringify({
                id: visitor._id,
                name: visitor.name,
                phone: visitor.phone,
                status: "APPROVED"
            });
            visitor.qrCode = await generateQRCode(qrData);

            // Send approval email with QR code
            if (visitor.email) {
                await sendEmail({
                    to: visitor.email,
                    subject: 'Visitor Pass Approved',
                    html: emailTemplates.visitorApproved(
                        visitor.name,
                        req.user.name,
                        visitor.qrCode
                    )
                });
            }
        } else if (status === "REJECTED" && visitor.email) {
            // Send rejection email
            await sendEmail({
                to: visitor.email,
                subject: 'Visitor Request Update',
                html: emailTemplates.visitorRejected(visitor.name, req.user.name)
            });
        }

        await visitor.save();

        await logAudit({
            action: "UPDATE_STATUS",
            entity: "VISITOR",
            entityId: visitor._id,
            user: req.user,
            oldStatus,
            newStatus: status
        })

        res.json({ message: `Status ${status} Updated Successfully`, visitor });
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

        const oldStatus = visitor.status;

        visitor.status = "CHECKED_IN";

        visitor.history.push({
            status: "CHECKED_IN",
            changedBy: req.user._id
        });

        await visitor.save();

        await logAudit({
            action: "CHECKED_IN",
            entity: "VISITOR",
            entityId: visitor._id,
            user: req.user,
            oldStatus,
            newStatus: "CHECKED_IN"
        })

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

        const oldStatus = visitor.status;


        visitor.status = "CHECKED_OUT";

        visitor.history.push({
            status: "CHECKED_OUT",
            changedBy: req.user._id
        });

        await visitor.save();

        await logAudit({
            action: "CHECKED_OUT",
            entity: "VISITOR",
            entityId: visitor._id,
            user: req.user,
            oldStatus,
            newStatus: "CHECKED_OUT"
        });

        res.json({ message: "Visitor Checked Out", visitor });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error Check Out" });
    }
};

exports.dashboardStats = async (req, res) => {
    try {
        
        res.set("Cache-Control", "no-store");

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

exports.searchVisitors = async (req, res) => {
    try {
        const { search = "",
            status,
            page = 1,
            limit = 10,
        } = req.body

        const query = {};

        // status Filter
        if (status) {
            query.status = status;
        }

        //text search

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { purpose: { $regex: search, $options: "i" } }
            ]
        }

        const skip = (page - 1) * limit;

        const [visitors, total] = await Promise.all([
            Visitor.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).populate("host", "name email role"),
            Visitor.countDocuments(query)

        ])

        res.json({ visitors, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error searching visitors" });
    }
}


exports.getVisitorHistory = async (req, res) => {
    const { id } = req.params;

    try {
        const visitor = await Visitor.findById(id)
            .populate("history.changedBy", "name role");

        if (!visitor) {
            return res.status(404).json({ message: "Visitor not found" })
        }

        res.json({ history: visitor.history })

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }

};

exports.getAuditLogs = async (req, res) => {
    try {
        const logs = await AuditLog.find()
            .populate("performedBy", "name role")
            .sort({ createdAt: -1 });


        res.json({ logs });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }

}

exports.updateVisitor = async (req, res) => {
    const { id } = req.params;
    const { name, phone, email, purpose } = req.body;
    
    try {
        const visitor = await Visitor.findById(id);
        if (!visitor) {
            return res.status(404).json({ message: "Visitor not found" });
        }

        // Update allowed fields
        if (name) visitor.name = name;
        if (phone) visitor.phone = phone;
        if (email) visitor.email = email;
        if (purpose) visitor.purpose = purpose;

        await visitor.save();

        await logAudit({
            action: "UPDATE_VISITOR",
            entity: "VISITOR",
            entityId: visitor._id,
            user: req.user
        });

        res.json({ message: "Visitor updated successfully", visitor });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating visitor" });
    }
};

exports.deleteVisitor = async (req, res) => {
    const { id } = req.params;
    
    try {
        const visitor = await Visitor.findById(id);
        if (!visitor) {
            return res.status(404).json({ message: "Visitor not found" });
        }

        await logAudit({
            action: "DELETE_VISITOR",
            entity: "VISITOR",
            entityId: visitor._id,
            user: req.user
        });

        await Visitor.findByIdAndDelete(id);

        res.json({ message: "Visitor deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting visitor" });
    }
};
// Get My Digital Pass (VISITOR role)
exports.getMyPass = async (req, res) => {
    try {
        // Find visitor records where the email matches the logged-in visitor's email
        const visitorRecords = await Visitor.find({
            email: req.user.email,
            status: { $in: ["APPROVED", "CHECKED_IN", "CHECKED_OUT"] }
        })
        .populate("host", "name email")
        .sort({ createdAt: -1 });

        res.json({ passes: visitorRecords });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching digital pass" });
    }
};

// Download PDF Badge
exports.downloadBadge = async (req, res) => {
    try {
        const { id } = req.params;
        const visitor = await Visitor.findById(id).populate('host', 'name email');

        if (!visitor) {
            return res.status(404).json({ message: "Visitor not found" });
        }

        if (visitor.status !== "APPROVED" && visitor.status !== "CHECKED_IN") {
            return res.status(400).json({ message: "Visitor not approved" });
        }

        const pdfDoc = await generateVisitorBadge(visitor, visitor.qrCode);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=visitor-badge-${visitor.name.replace(/\s+/g, '-')}.pdf`);
        
        pdfDoc.pipe(res);
    } catch (err) {
        console.error('PDF generation error:', err);
        res.status(500).json({ message: "Error generating badge" });
    }
};

// Export Visitors to CSV
exports.exportVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.find()
            .populate('host', 'name email')
            .sort({ createdAt: -1 });

        const csv = exportToCSV(visitors);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=visitors-export-${new Date().toISOString().split('T')[0]}.csv`);
        res.send(csv);
    } catch (err) {
        console.error('CSV export error:', err);
        res.status(500).json({ message: "Error exporting data" });
    }
};

// Validate QR Code for Check-In
exports.validateQR = async (req, res) => {
    try {
        const { qrData } = req.body;
        
        if (!qrData) {
            return res.status(400).json({ message: "QR data required" });
        }

        const parsedData = JSON.parse(qrData);
        const visitor = await Visitor.findById(parsedData.id).populate('host', 'name email');

        if (!visitor) {
            return res.status(404).json({ message: "Invalid QR code" });
        }

        if (visitor.status !== "APPROVED" && visitor.status !== "CHECKED_IN") {
            return res.status(400).json({ 
                message: `Visitor not approved. Current status: ${visitor.status}`
            });
        }

        res.json({ 
            valid: true, 
            visitor: {
                _id: visitor._id,
                name: visitor.name,
                phone: visitor.phone,
                email: visitor.email,
                purpose: visitor.purpose,
                host: visitor.host,
                status: visitor.status,
                photo: visitor.photo
            }
        });
    } catch (err) {
        console.error('QR validation error:', err);
        res.status(400).json({ message: "Invalid QR code format" });
    }
};
