import cookieParser from "cookie-parser";
import express from "express";
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./connection.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://51.17.202.182:3000" }));

// API routes
app.use("/api/v1", userRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../frontend/build")));

// The catch-all handler for other routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server connected to port ${PORT}`);
});
