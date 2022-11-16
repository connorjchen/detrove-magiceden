import { query } from "../db.js";

export async function getListing(listingId, req, res) {
  try {
    let result = await query(`SELECT * FROM listings WHERE id = ?`, [
      listingId,
    ]);

    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateListing(listingId, price, isDeleted, req, res) {
  try {
    const deletedAt = isDeleted ? new Date() : null;

    const result = await query(
      `UPDATE listings SET price = ?, deleted_at = ? WHERE id = ?`,
      [price, deletedAt, listingId]
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
