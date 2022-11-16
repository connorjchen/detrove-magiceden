import express from "express";
import {
  getItems,
  getActiveListings,
  getUser,
  getWatchlist,
} from "../services/profileServices.js";

const router = express.Router();

router.get("/items/:userId", async function (req, res) {
  const { userId } = req.body;
  await getItems(userId, req, res);
});

router.get("/active/listings/:userId", async function (req, res) {
  const { userId } = req.body;
  await getActiveListings(userId, req, res);
});

router.get("/user/:userId", async function (req, res) {
  const { userId } = req.params;
  await getUser(userId, req, res);
});

router.get("/watchlist/:userId", async function (req, res) {
  const { userId } = req.params;
  await getWatchlist(userId, req, res);
});

export default router;
