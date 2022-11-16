import { query } from "../db.js";

export async function getListings(req, res) {
  // REPLACE QUERY
  try {
    let result = await query(
      `
      SELECT subquery.*
      FROM (
        SELECT sneakers.*, items.size, listings.price, ROW_NUMBER() OVER(PARTITION BY sneakers.id, items.size ORDER BY listings.price) row_num
          FROM items
          INNER JOIN sneakers ON items.sneaker_id = sneakers.id
          INNER JOIN listings ON items.id = listings.item_id
        WHERE listings.sold_at IS NULL
          AND listings.deleted_at IS NULL
        ) subquery
      WHERE subquery.row_num = 1
      ORDER BY subquery.id, subquery.size
      `
    );
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
