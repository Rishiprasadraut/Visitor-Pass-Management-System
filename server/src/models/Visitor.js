const mongoose = require('mongoose');
const { model, Schema } = mongoose;


const visitorSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    photo: {
        type: String, // Path to uploaded photo
    },
    qrCode: {
        type: String, // QR code data URL
    },
    purpose: {
        type: String,
        required: true,
    },
    host: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ["PENDING", "APPROVED", "REJECTED", "CHECKED_IN", "CHECKED_OUT"],
        default: "PENDING",
    },
    history: [
        {
            status: {
                type: String,
                required: true
            },
            changedAt: {
                type: Date,
                default: Date.now
            },
            changedBy: {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ]
}, { timestamps: true }
);


module.exports = model("Visitor", visitorSchema);
