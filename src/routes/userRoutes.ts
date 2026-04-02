import express from "express";
import { createuser, login } from "../controller/usercontroller";
// 1) create router
const UserRoutes = express.Router();

// 2)request handler
UserRoutes.post("/signup", createuser);
UserRoutes.post("/login", login);

export default UserRoutes;
