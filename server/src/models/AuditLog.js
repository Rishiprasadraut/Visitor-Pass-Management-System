const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const auditLogSchema = new Schema({
    action: {
        type: String,
        required: true
    },
    entity: {
        type: String,
        required: true
    },
    entityId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    performedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: String,
    oldStatus: String,
    newStatus: String,

}, { timestamps: true });

module.exports = model("AuditLog", auditLogSchema);