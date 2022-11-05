import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import categoryRoutes from "./routes/categoryRoutes.js";
dotenv.config();

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/categories", categoryRoutes);

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on Port ${PORT}`)
);
