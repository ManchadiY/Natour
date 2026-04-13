"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    review: {
        type: String,
        minLength: 10,
        maxLength: 100,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    user: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "User",
    },
    tour: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "Tour",
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
//2)create a model
const Review = mongoose_1.default.model("Review", reviewSchema);
exports.default = Review;
