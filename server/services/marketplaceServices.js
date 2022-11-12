import { query } from "../db.js";

export async function getListings(req, res) {
  // REPLACE QUERY
  try {
    let result = await query(`SELECT * FROM listings`);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
