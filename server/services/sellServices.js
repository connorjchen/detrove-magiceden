import { query } from "../db.js";
import { v4 as uuid } from "uuid";
import { getSneaker as productServicesGetSneaker } from "./productServices.js";

export async function getSneaker(sneakerId, req, res) {
  await productServicesGetSneaker(sneakerId, req, res);
}

export async function getUnlistedItems(userId, sneakerId, req, res) {
  // REPLACE QUERY
  try {
    let result = await query(`SELECT * FROM listings`);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createListing(itemId, sellerId, price, req, res) {
  try {
    let result = await query(
      `INSERT INTO listings
    VALUES (?, ?, ?, ?, DEFAULT, DEFAULT, DEFAULT, DEFAULT)`,
      [uuid(), itemId, sellerId, price]
    );
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
