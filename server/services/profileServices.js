import { query } from "../db.js";

export async function getItems(userId, req, res) {
  try {
    let result = await query(
      `SELECT * FROM items
    INNER JOIN sneakers ON items.sneaker_id = sneakers.id
    INNER JOIN listings ON items.id = listings.item_id
    WHERE items.owner_id = ? AND listings.sold_at IS NULL AND listings.deleted_at IS NULL
    ORDER BY sneakers.id, items.size;`,
      [userId]
    );
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getActiveListings(userId, req, res) {
  try {
    let result = await query(
      `SELECT * FROM listings
      WHERE seller_id = ? AND sold_at IS NULL AND deleted_at IS NULL ORDER BY created_at`,
      [userId]
    );
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getUser(userId, req, res) {
  try {
    let result = await query(`SELECT * FROM users WHERE id = ?`, [userId]);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getWatchlist(userId, req, res) {
  try {
    let result = await query(`SELECT * FROM watchlist_items WHERE id = ?`, [
      userId,
    ]);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
