import express from "express";
import {
  getSneaker,
  createListing,
  updateListing,
} from "../services/sellServices.js";

const router = express.Router();

router.get("/sneaker/:nftAddress", async function (req, res) {
  const { nftAddress } = req.params;
  await getSneaker(nftAddress, req, res);
});

router.post("/listing", async function (req, res) {
  const { nftId, sellerId, price, startDate, endDate } = req.body;
  await createListing(nftId, sellerId, price, startDate, endDate, req, res);
});

router.put("/listing", async function (req, res) {
  const { price, startDate, endDate, isDeleted } = req.body;
  await updateListing(price, startDate, endDate, isDeleted, req, res);
});

export default router;
