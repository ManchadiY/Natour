// console.log("hello yuvraj");

import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
const express = require("express");

const app = express();

app.use(express.json());

const port = 3000;

app.get("/", (req: Request, res: Response) => {
  // console.log("req", req);

  res.send("Hello World!");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Undefined route accessed:", req.originalUrl);
  // res.status(404).json({ message: "Route not found" });
  const err = new Error("route not found") as any;
  err.statuscode = 404;
  err.status = "failed";

  next(err);
});

app.use((err: any, req: any, res: any, next: any) => {
  console.log("hello");
  err.statuscode = err.statuscode || 400;
  err.status = err.status || "failed";

  res.status(err.statuscode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;

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
