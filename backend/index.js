import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import equipmentRoutes from "./routes/equipment.route.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

// mongoDb connection 
connectDB();

// api routes
app.use("/api/equipment", equipmentRoutes);

app.listen(process.env.PORT, () => console.log("Server running on port 5000"));