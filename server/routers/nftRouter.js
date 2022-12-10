import express from "express";
import nftServices from "../services/nftServices.js";
import { v4 as uuid } from "uuid";

const router = express.Router();

router.get("/", async function (req, res) {
  try {
    res.json(await nftServices.getAll());
  } catch (err) {
    console.error(`Error while getting NFTs `, err.message);
  }
});

router.post("/", async function (req, res) {
  try {
    const { name } = req.body;
    res.json(await nftServices.create(uuid(), name));
  } catch (err) {
    console.error(`Error while creating NFTs `, err.message);
  }
});

export default router;
