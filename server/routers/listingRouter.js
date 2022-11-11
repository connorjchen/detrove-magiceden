import express from "express";
import {
  getListings,
  getIfUserCanSellSneaker,
  createWatchlistItem,
} from "../services/listingServices.js";

const router = express.Router();

router.get("/listings/:sneakerId", async function (req, res) {
  const { sneakerId } = req.params;
  await getListings(sneakerId, req, res);
});

router.get("/sell/:userId/:sneakerId", async function (req, res) {
  const { userId, sneakerId } = req.params;
  const { nftAddresses } = req.body;
  await getIfUserCanSellSneaker(userId, sneakerId, nftAddresses, req, res);
});

router.post("/watchlist", async function (req, res) {
  const { userId, sneakerId } = req.body;
  await createWatchlistItem(userId, sneakerId, req, res);
});

export default router;
