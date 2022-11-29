import { query } from "../db.js";
import { v4 as uuid } from "uuid";

export async function getItems(userId, req, res) {
  try {
    let result = await query(
      `
      SELECT items.*, sneakers.brand, sneakers.name, listings.price
      FROM items
      INNER JOIN sneakers ON items.sneaker_id = sneakers.id
      INNER JOIN listings ON items.id = listings.item_id
      WHERE items.owner_id = ?
      AND listings.sold_at IS NULL
      AND listings.deleted_at IS NULL

      UNION

      SELECT  items.*, sneakers.brand, sneakers.name, NULL as price
      FROM items
      INNER JOIN sneakers ON items.sneaker_id = sneakers.id
      WHERE items.id NOT IN (
      SELECT items.id
        FROM items
        INNER JOIN listings ON items.id = listings.item_id
        WHERE listings.sold_at IS NULL
        AND listings.deleted_at IS NULL
      )
      AND items.owner_id = ?
      `,
      [userId, userId]
    );
    result = result.map((item) => {
      item.size = Number(item.size);
      if (item.price) {
        item.price = Number(item.price);
      }
      return item;
    });
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getActiveListings(userId, req, res) {
  try {
    let result = await query(
      `
      SELECT listings.*, items.size, sneakers.name, items.sneaker_id
      FROM listings
      INNER JOIN items ON listings.item_id = items.id
      INNER JOIN sneakers ON items.sneaker_id = sneakers.id
      WHERE seller_id = ?
      AND sold_at IS NULL
      AND deleted_at IS NULL 
      ORDER BY created_at DESC
      `,
      [userId]
    );
    result = result.map((listing) => {
      listing.size = Number(listing.size);
      listing.price = Number(listing.price);
      return listing;
    });
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getUser(userEmail, req, res) {
  try {
    let result = await query(`SELECT * FROM users WHERE email = ?`, [
      userEmail,
    ]);
    if (result.length === 0) {
      await query(
        `
        INSERT INTO users
        VALUES (?, ?, 1000, DEFAULT)
        `,
        [uuid(), userEmail]
      );
      result = await query(`SELECT * FROM users WHERE email = ?`, [userEmail]);
    }
    result = result[0];
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
