import express from "express";
import {
  getSneaker,
  getUnlistedNfts,
  createListing,
} from "../services/sellServices.js";

const router = express.Router();

router.get("/sneaker/:sneakerId", async function (req, res) {
  const { sneakerId } = req.params;
  await getSneaker(sneakerId, req, res);
});

router.get("/unlisted/nfts/:userId/:sneakerId", async function (req, res) {
  const { userId, sneakerId } = req.params;
  const { nftAddresses } = req.body;
  await getUnlistedNfts(userId, sneakerId, nftAddresses, req, res);
});

router.post("/listing", async function (req, res) {
  const { nftId, sellerId, price, startDate, endDate } = req.body;
  await createListing(nftId, sellerId, price, startDate, endDate, req, res);
});

export default router;
