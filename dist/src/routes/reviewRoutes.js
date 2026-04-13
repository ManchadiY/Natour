"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewController_1 = require("../controller/reviewController");
//1) create a Router from express
const ReviewRoutes = express_1.default.Router();
//2)create route on this router
ReviewRoutes.get("/", reviewController_1.getReviews);
//3)export Router
exports.default = ReviewRoutes;
