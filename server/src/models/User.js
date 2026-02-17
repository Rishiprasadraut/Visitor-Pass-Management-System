const { model, Schema } = require('mongoose')


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['ADMIN', 'SECURITY', 'EMPLOYEE', 'VISITOR'],
        default: 'EMPLOYEE',
    }
}, { timestamps: true })

module.exports = model("User", userSchema);