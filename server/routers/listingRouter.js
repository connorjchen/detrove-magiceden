import express from "express";
import listingServices from "../services/listingServices.js";
import { v4 as uuid } from "uuid";

const router = express.Router();

router.get("/", async function (req, res) {
  try {
    res.json(await listingServices.getAll());
  } catch (err) {
    console.error(`Error while getting listings `, err.message);
  }
});

router.post("/", async function (req, res) {
  try {
    const { nftId, price } = req.body;
    res.json(await listingServices.create(uuid(), nftId, price));
  } catch (err) {
    console.error(`Error while creating listings `, err.message);
  }
});

export default router;
