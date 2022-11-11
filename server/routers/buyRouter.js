import express from "express";
import { getListings } from "../services/buyServices.js";

const router = express.Router();

router.get("/listings/:sneakerId", async function (req, res) {
  const { sneakerId } = req.params;
  await getListings(sneakerId, req, res);
});

export default router;
