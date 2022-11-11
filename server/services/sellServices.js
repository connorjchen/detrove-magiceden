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
  nft_id,
  seller_id,
  price,
  start_date,
  end_date,
  req,
  res
) {
  try {
    const result = await query(
      `INSERT INTO listings
    VALUES (?, ?, ?, ?, ?, ?, DEFAULT, DEFAULT, DEFAULT)`,
      [uuid(), nft_id, seller_id, price, start_date, end_date]
    );
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateListing(
  price,
  start_date,
  end_date,
  is_deleted,
  req,
  res
) {
  // REPLACE QUERY AND CHECK WHICH INPUTS NEED TO BE CHANGED (check undefined)
  try {
    const result = await query("SELECT * FROM listings");
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { getSneaker, createListing, updateListing };
