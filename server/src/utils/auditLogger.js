const AuditLog = require("../models/AuditLog");

const logAudit = async ({ action, entity, entityId, user, oldStatus, newStatus }) => {
   try{
      console.log("AUDIT LOGGER CALLED"); // 🔍 DEBUG
    console.log("USER:", user?._id);
     await AuditLog.create({
        action,
        entity,
        entityId,
        performedBy: user._id,
        role: user.role,
        oldStatus,
        newStatus

    });
   }catch(err){
        console.error("Audit log error:", err);
   }
};

module.exports = logAudit;