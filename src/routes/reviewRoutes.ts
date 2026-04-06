import express from "express";
import { getReviews } from "../controller/reviewController";
//1) create a Router from express
const ReviewRoutes = express.Router();

//2)create route on this router
ReviewRoutes.get("/", getReviews);

//3)export Router
export default ReviewRoutes;
