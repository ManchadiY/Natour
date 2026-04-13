// console.log("hello yuvraj");
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import AppError from "./utils/appErro";
import globalErrorHandler from "./controller/errorController";
import UserRoutes from "./routes/userRoutes";
import TourRoutes from "./routes/tourRoutes";
import ReviewRoutes from "./routes/reviewRoutes";

const app = express();
app.use(express.json());
app.set("query parser", "extended");
app.use(morgan("dev"));

//http way
// app.get("/", (req: Request, res: Response) => {
//   // console.log("req", req);
//   res.send("Hello World!");
// });

//express way
app.get("/", (req: Request, res: Response) => {
  // console.log("req", req);
  res.status(200).json({
    status: "success",
    message: "Hello World!",
  });
});

app.use("/api/v1/users", UserRoutes); //user based routes
app.use("/api/v1/tours", TourRoutes); //tour based
app.use("/api/v1/reviews", ReviewRoutes); //review

app.use((req: Request, res: Response, next: NextFunction) => {
  // const err = new Error("route not found") as any;
  // err.statuscode = 404;
  // err.status = "failed";
  // next(err);
  // calling error using the global class
  next(new AppError("route not found", 404));
});

// global error handler takes 4 parameter err,req,res,next
// app.use((err: any, req: any, res: any, next: any) => {
//   err.statuscode = err.statuscode || 400;
//   err.status = err.status || "failed";
//   res.status(err.statuscode).json({
//     status: err.status,
//     message: err.message,
//   });
// });

app.use(globalErrorHandler);

export default app;

//simple http sever using http module
/*
const http = require("http");
const url = require("url");

//creating a server
const server = http.createServer((req: any, res: any) => {
  const pathName = req.url;
  console.log("pathname", pathName);

  res.end("hello from the server ");
});

//listening to server
server.listen(8000, `127.0.0.1`, () => {
  console.log("listening on the server at port 8000");
});
*/
