import { query } from "../db.js";
import {
  getSneaker as productServicesGetSneaker,
  getListings as productServicesGetListings,
} from "./productServices.js";

export async function getSneaker(sneakerId, req, res) {
  await productServicesGetSneaker(sneakerId, req, res);
}

export async function getListings(sneakerId, req, res) {
  await productServicesGetListings(sneakerId, req, res);
}

export async function updatePurchase(listingId, buyerId, req, res) {
  try {
    let result = await query(
      `UPDATE listings SET sold_at = CURRENT_TIMESTAMP, buyer_id = ? WHERE id = ?`,
      [buyerId, listingId]
    );

    if (result.affectedRows === 0) {
      res.status(500).json({ message: "No rows were affected" });
      return;
    }

    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
