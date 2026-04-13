"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//create a user model with name,role,actice,email,password
const mongoose_1 = __importDefault(require("mongoose"));
// 1)create a schema
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: [true, "user must have a name"],
    },
    email: {
        type: String,
        require: [true, "please provide your email"],
        // we can have validation
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "guide", "lead-guide", "admin"],
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
    password: {
        type: String,
        require: [true, "please enter password"],
        minlength: 8,
        select: false, // this will help to not show password to the user or this field will not be displayed
    },
    passwordConfirm: {
        type: String,
        require: [true, "please confirm your password"],
        minlength: 8,
        select: false, // this will help to not show password to the user or this field will not be displayed
        // validate function to check if both the password are same
    },
    passwordChangedAt: Date,
    passwordResetToken: {
        type: String,
    },
    passwordResetExpire: {
        type: String,
    },
});
//2 create a model based on schema
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
