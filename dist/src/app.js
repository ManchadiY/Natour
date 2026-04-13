"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// console.log("hello yuvraj");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const appErro_1 = __importDefault(require("./utils/appErro"));
const errorController_1 = __importDefault(require("./controller/errorController"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const tourRoutes_1 = __importDefault(require("./routes/tourRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.set("query parser", "extended");
app.use((0, morgan_1.default)("dev"));
//http way
// app.get("/", (req: Request, res: Response) => {
//   // console.log("req", req);
//   res.send("Hello World!");
// });
//express way
app.get("/", (req, res) => {
    // console.log("req", req);
    res.status(200).json({
        status: "success",
        message: "Hello World!",
    });
});
app.use("/api/v1/users", userRoutes_1.default); //user based routes
app.use("/api/v1/tours", tourRoutes_1.default); //tour based
app.use("/api/v1/reviews", reviewRoutes_1.default); //review
app.use((req, res, next) => {
    // const err = new Error("route not found") as any;
    // err.statuscode = 404;
    // err.status = "failed";
    // next(err);
    // calling error using the global class
    next(new appErro_1.default("route not found", 404));
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
app.use(errorController_1.default);
exports.default = app;
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
