const { model, Schema } = require('mongoose');

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
}, { timestamps: true }
);


module.exports = model("Visitor", visitorSchema);
