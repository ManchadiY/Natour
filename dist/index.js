"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// console.log("hello yuvraj");
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./src/app"));
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const app = require("./src/app");
//env file
dotenv_1.default.config({ path: "./.env" });
// Type-safe environment variable access
const DB = process.env.DATABASE;
const DB_PASSWORD = process.env.DB_PASSWORD;
//handle uncaughtexpression
process.on("uncaughtException", (err) => {
    console.log("uncaughtException", err);
    process.exit(1); //uncaught exception if its 1 , if its 0 its success
});
// testing the uncaughtExpception
// setTimeout(() => {
//   const user: any = undefined;
//   console.log(user.name); // 💥 crash
// }, 1000);
if (!DB || !DB_PASSWORD) {
    throw new Error("DATABASE or DB_PASSWORD not defined in environment variables");
}
const connectionString = DB.replace("<password>", DB_PASSWORD);
(async () => {
    await mongoose_1.default.connect(connectionString);
    console.log("connecting to db");
})();
// (async (): Promise<void> => {
//   try {
//     await mongoose.connect(connectionString);
//     console.log("MongoDB connected successfully");
//   } catch (err) {
//     console.error("MongoDB connection failed", err);
//   }
// })();
const port = 3000;
const server = app_1.default.listen(port, () => {
    console.log(`listening on port ${port}`);
});
// error outside express unhandled rejection for promises
process.on("unhandledRejection", (err) => {
    console.log("unhandled rejection", err);
    // error happened close the server
    server.close(() => {
        console.log("closing the server");
        process.exit(1);
    });
});
