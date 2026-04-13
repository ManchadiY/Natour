"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//1) create a schema
// fields in tourshcema
//startLocation,ratingAverage,ratingQuantity,rating,images,createdAt,startDates,secretTour,guides,name,duration,maxGroupSize,difficulty,price,summary,description,imageCover,locations,updatedAt
const tourSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: [true, "A tour should have a name"],
        unique: true,
    },
    price: {
        type: Number,
        require: [true, "A tour should have a price"],
    },
    difficulty: {
        type: String,
        enum: {
            values: ["easy", "medium", "difficult"],
            message: "Difficulty is either:easy, medium, difficult",
        },
        require: [true, "A tour must have difficulty mentioned"],
    },
    summary: {
        type: String,
        require: [true, "A tour must have a summary"],
    },
    description: {
        type: String,
        // require: [true, "A tour must have a Description"],
    },
    locations: [
        {
            type: {
                type: String,
                default: "point",
                enum: ["Point"],
            },
            coordinates: [Number],
            description: String,
            address: String,
            day: Number,
        },
    ],
    startDates: [Date],
    startLocation: {
        type: {
            type: String,
            default: "point",
            enum: ["Point"],
        },
        coordinates: [Number],
        description: String,
        address: String,
    },
    maxGroupSize: {
        type: Number,
        require: true,
    },
    guides: [
        {
            type: mongoose_1.default.Schema.ObjectId,
            ref: "User",
        },
    ],
    secretTour: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 4.5,
        min: 0,
        max: 5,
    },
    ratingQuantity: {
        type: Number,
        default: 0,
    },
    ratingAverage: {
        type: Number,
        min: [1, "min should be 1"],
        max: [5, "max should be 5"],
        set: (val) => Math.round(val * 10) / 10, //ex  4.666 , 46.66,47,4.7
    },
    // images: {  wrong way
    //   type: Array,
    // },
    images: [String],
    imageCover: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
// 2)model from schema
const Tour = mongoose_1.default.model("Tour", tourSchema);
// 3) export the model
exports.default = Tour;
