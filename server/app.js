import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import nftRouter from "./routers/nftRouter.js";
import listingRouter from "./routers/listingRouter.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// ADD API TO BASE URL
app.get("/", (req, res) => {
  res.json({ message: "Server is up and running!" });
});

app.use("/api/nfts", nftRouter);
app.use("/api/listings", listingRouter);

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
