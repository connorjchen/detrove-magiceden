import express from "express";
import {
  getListings,
  getIfUserCanSellSneaker,
  createWatchlistItem,
} from "../services/listingServices.js";

const router = express.Router();

router.get("/listings/:sneaker_id", async function (req, res) {
  const { sneaker_id } = req.params;
  await getListings(sneaker_id, req, res);
});

router.get("/sell/:user_id/:sneaker_id", async function (req, res) {
  const { user_id, sneaker_id } = req.params;
  const { nft_addresses } = req.body;
  await getIfUserCanSellSneaker(user_id, sneaker_id, nft_addresses, req, res);
});

router.post("/watchlist", async function (req, res) {
  const { user_id, sneaker_id } = req.body;
  await createWatchlistItem(user_id, sneaker_id, req, res);
});

export default router;
