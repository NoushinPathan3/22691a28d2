import app from "./app.js";
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on ${process.env.HOST}`);
    });
  })
  .catch((err) => console.error("DB connection error:", err));
