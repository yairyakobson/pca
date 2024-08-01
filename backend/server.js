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

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://51.17.202.182:3000" }));
app.use("/api/v1", userRoutes);

app.listen(process.env.PORT, () =>{
  console.log(
    `Server connected to port ${process.env.PORT}`
  );
});
