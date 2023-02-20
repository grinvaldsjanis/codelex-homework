import mongoose from "mongoose";
import express from "express";
import router from "./routes/routers";

import cors from "cors";
const app = express();
const PORT = 3005;
const dbURI = "mongodb://localhost:27017/todo-db";

app.use(cors({ origin: "*" }));

mongoose.set("strictQuery", false);

mongoose.connect(dbURI).then(() => {
  console.log("Connected to database");

  app.use("/tasks", router);

  app.get("/test", (req, res) => {
    console.log("Test route called!");
    res.send("Hello World");
  });

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}).catch((error) => {
  console.error("Error connecting to database", error);
  process.exit(1); // exit the process with an error code
});