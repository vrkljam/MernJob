import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

// Routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

// public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.json());
app.use(cookieParser());

// >>>>>>>>>old way <<<<<<<<<<<<<<<
// const getData = async () => {
//   const resp = await fetch(
//     "https://www.course-api.com/react-useReducer-cart-project"
//   );
//   const cartData = await resp.json();
//   console.log(cartData);
// };

// getData();
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// >>>>>>>>new way below<<<<<<<<<<<<<<<

// try {
//   const resp = await fetch(
//     "https://www.course-api.com/react-useReducer-cart-project"
//   );
//   const cartData = await resp.json();
//   console.log(cartData);
// } catch (error) {
//   console.log(error);
// }
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// fetch("https://www.course-api.com/react-useReducer-cart-project")
//   .then((res) => res.json())
//   .then((data) => console.log(data));

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5100;

// >> my way to connect
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("connected to DB"))
//   .catch((err) => console.log(err));

// course's way to connect to mongoose
try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`server is on port: ${PORT}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
