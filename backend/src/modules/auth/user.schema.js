const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: false,
        trim: true, 
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },

    phone: {
        type: String,
        required: false,
        trim: true,
    },

    password: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: false,
        trim: true,
    },

    roles: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    
    },

    isActive: {
        type: Boolean,
        default: true
    }
    
}, {
    timestamps: true,
})

module.exports = mongoose.model("User", userSchema);