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

export async function updateListing(
  listingId,
  price,
  startDate,
  endDate,
  soldAt,
  deletedAt,
  req,
  res
) {
  try {
    const updateResult = await query(
      `UPDATE listings SET price = ?, start_date = ?, end_date = ?, sold_at = ?, deleted_at = ? WHERE id = ?`,
      [price, startDate, endDate, soldAt, deletedAt, listingId]
    );

    if (updateResult.affectedRows === 0) {
      res.status(500).json({ message: "No rows were affected" });
      return;
    }

    let result = await query(`SELECT * FROM listings WHERE id = ?`, [
      listingId,
    ]);

    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
