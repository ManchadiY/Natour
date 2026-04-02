// console.log("hello yuvraj");

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./src/app");
//env file
dotenv.config({ path: "./.env" });

// Type-safe environment variable access
const DB = process.env.DATABASE;
const DB_PASSWORD = process.env.DB_PASSWORD;

if (!DB || !DB_PASSWORD) {
  throw new Error(
    "DATABASE or DB_PASSWORD not defined in environment variables",
  );
}

const connectionString = DB.replace("<password>", DB_PASSWORD);

(async (): Promise<void> => {
  try {
    await mongoose.connect(connectionString);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed", err);
  }
})();

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
