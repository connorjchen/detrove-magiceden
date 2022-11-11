import { query } from "../db.js";
import { v4 as uuid } from "uuid";

async function getSneaker(address, req, res) {
  // REPLACE QUERY
  try {
    const result = await query("SELECT * FROM listings");
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createListing(
  nftId,
  sellerId,
  price,
  startDate,
  endDate,
  req,
  res
) {
  try {
    const result = await query(
      `INSERT INTO listings
    VALUES (?, ?, ?, ?, ?, ?, DEFAULT, DEFAULT, DEFAULT)`,
      [uuid(), nftId, sellerId, price, startDate, endDate]
    );
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateListing(price, startDate, endDate, isDeleted, req, res) {
  // REPLACE QUERY AND REPLACE ALL FIELDS
  try {
    const result = await query("SELECT * FROM listings");
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { getSneaker, createListing, updateListing };
