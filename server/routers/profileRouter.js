import express from "express";
import {
  getSneakers,
  getWatchlist,
  getUser,
  updateUser,
} from "../services/profileServices.js";

const router = express.Router();

router.get("/sneakers", async function (req, res) {
  const { nft_addresses } = req.body;
  await getSneakers(nft_addresses, req, res);
});

router.get("/watchlist/:user_id", async function (req, res) {
  const { user_id } = req.params;
  await getWatchlist(user_id, req, res);
});

router.get("/user/:user_address", async function (req, res) {
  const { user_address } = req.params;
  await getUser(user_address, req, res);
});

router.put("/user", async function (req, res) {
  const { username } = req.body;
  await updateUser(username, req, res);
});

export default router;
