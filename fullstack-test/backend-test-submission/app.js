import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import urlRoutes from "./routes/urlRoutes.js";
import logger from "./middlewares/logger.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // explicitly allow your frontend
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(logger);
app.use("/", urlRoutes);

export default app;
