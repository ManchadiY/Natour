import express from "express";
import {
  createuser,
  getUser,
  login,
  getAllUsers,
} from "../controller/usercontroller";
// 1) create router
const UserRoutes = express.Router();

// 2)request handler
UserRoutes.post("/signup", createuser);
UserRoutes.post("/login", login);
UserRoutes.get("/", getAllUsers);
UserRoutes.get("/:id", getUser);

export default UserRoutes;
