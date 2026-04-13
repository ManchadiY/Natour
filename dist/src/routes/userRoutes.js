"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usercontroller_1 = require("../controller/usercontroller");
// 1) create router
const UserRoutes = express_1.default.Router();
// 2)request handler
UserRoutes.post("/signup", usercontroller_1.createuser);
UserRoutes.post("/login", usercontroller_1.login);
UserRoutes.get("/", usercontroller_1.getAllUsers);
UserRoutes.get("/:id", usercontroller_1.getUser);
exports.default = UserRoutes;
