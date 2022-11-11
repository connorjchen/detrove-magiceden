import express from "express";
import {
  getSneaker,
  createListing,
  updateListing,
} from "../services/sellServices.js";

const router = express.Router();

router.get("/sneaker/:nft_address", async function (req, res) {
  const { nft_address } = req.params;
  await getSneaker(nft_address, req, res);
});

router.post("/listing", async function (req, res) {
  const { nft_id, seller_id, price, start_date, end_date } = req.body;
  await createListing(nft_id, seller_id, price, start_date, end_date, req, res);
});

router.put("/listing", async function (req, res) {
  const { price, start_date, end_date, is_deleted } = req.body;
  await updateListing(price, start_date, end_date, is_deleted, req, res);
});

export default router;
