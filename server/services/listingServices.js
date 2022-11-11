import { query } from "../db.js";

async function getListings(sneakerId, req, res) {
  // REPLACE QUERY
  try {
    const result = await query("SELECT * FROM listings");
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getIfUserCanSellSneaker(
  userId,
  sneakerId,
  ownedNftAddresses,
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

async function createWatchlistItem(userId, sneakerId, req, res) {
  try {
    const result = await query(
      `INSERT INTO watchlist_items
    VALUES (?, ?, ?, DEFAULT, DEFAULT`,
      [uuid(), userId, sneakerId]
    );
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { getListings, getIfUserCanSellSneaker, createWatchlistItem };
