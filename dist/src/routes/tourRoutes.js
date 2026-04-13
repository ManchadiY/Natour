"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tourController_1 = require("../controller/tourController");
//1) create a Router from express
const TourRoutes = express_1.default.Router();
//2)create route on this router
TourRoutes.get("/", tourController_1.getTours);
//3)export Router
exports.default = TourRoutes;
