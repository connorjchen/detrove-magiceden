import { query } from "../db.js";

async function getListings(sneaker_id, req, res) {
  // REPLACE QUERY
  try {
    const result = await query("SELECT * FROM listings");
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getIfUserCanSellSneaker(
  user_id,
  sneaker_id,
  owned_nft_addresses,
  req,
  res
) {
  // REPLACE QUERY
  try {
    const result = await query("SELECT * FROM listings");
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createWatchlistItem(user_id, sneaker_id, req, res) {
  try {
    const result = await query(
      `INSERT INTO watchlist_items
    VALUES (?, ?, ?, DEFAULT, DEFAULT`,
      [uuid(), user_id, sneaker_id]
    );
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { getListings, getIfUserCanSellSneaker, createWatchlistItem };
