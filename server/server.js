import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import { StatusCodes } from "http-status-codes";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// Middlewares ------
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

// Routes ------
import usersRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import authRoute from "./routes/authRoute.js";

// public ------
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import { protectRoute } from "./middleware/authMiddleware.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./public")));

if (process.env.APP_ENV === "development") {
  app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());

// API starts ---
app.use("/api/auth", authRoute);
app.use("/api/users", protectRoute, usersRoute);
app.use("/api/masters", protectRoute, categoryRoute);
// API ends ---

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/forntend", "index.html"));
});

const port = process.env.APP_PORT || 3001;

app.use("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: `not found` });
});

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
