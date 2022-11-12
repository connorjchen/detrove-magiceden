import express from "express";
import { getListing, updateListing } from "../services/listingServices.js";

const router = express.Router();

router.get("/listing/:listingId", async function (req, res) {
  const { listingId } = req.params;
  await getListing(listingId, req, res);
});

router.patch("/listing/:listingId", async function (req, res) {
  const { listingId } = req.params;
  const { price, startDate, endDate, soldAt, deletedAt } = req.body;
  await updateListing(
    listingId,
    price,
    startDate,
    endDate,
    soldAt,
    deletedAt,
    req,
    res
  );
});

export default router;
