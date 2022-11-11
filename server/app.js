import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import marketplaceRouter from "./routers/marketplaceRouter.js";
import sellRouter from "./routers/sellRouter.js";
import profileRouter from "./routers/profileRouter.js";
import listingRouter from "./routers/listingRouter.js";
import navBarRouter from "./routers/navBarRouter.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Server is up and running!" });
});

app.use("/api/marketplace", marketplaceRouter);
app.use("/api/sell", sellRouter);
app.use("/api/profile", profileRouter);
app.use("/api/listing", listingRouter);
app.use("/api/navBar", navBarRouter);

const PORT = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(PORT, () =>
  console.log(`Server Running on Port: http://localhost:${PORT}`)
);
