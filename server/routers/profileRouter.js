import express from "express";
import {
  getSneakers,
  getWatchlist,
  getUser,
  updateUser,
} from "../services/profileServices.js";

const router = express.Router();

router.get("/sneakers", async function (req, res) {
  const { nftAddresses } = req.body;
  await getSneakers(nftAddresses, req, res);
});

router.get("/watchlist/:userId", async function (req, res) {
  const { userId } = req.params;
  await getWatchlist(userId, req, res);
});

router.get("/user/:userAddress", async function (req, res) {
  const { userAddress } = req.params;
  await getUser(userAddress, req, res);
});

router.put("/user/:userId", async function (req, res) {
  const { userId } = req.params;
  const { username } = req.body;
  await updateUser(userId, username, req, res);
});

export default router;
