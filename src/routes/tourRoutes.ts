import express from "express";
import { getTours } from "../controller/tourController";
//1) create a Router from express
const TourRoutes = express.Router();

//2)create route on this router
TourRoutes.get("/", getTours);

//3)export Router
export default TourRoutes;
