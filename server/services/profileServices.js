import { query } from "../db.js";

export async function getSneakers(nftAddresses, req, res) {
  // REPLACE QUERY
  try {
    let result = await query(`SELECT * FROM listings`);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getWatchlist(userId, req, res) {
  // REPLACE QUERY
  try {
    let result = await query(`SELECT * FROM listings`);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getUser(userAddress, req, res) {
  try {
    let result = await query(
      `SELECT * FROM users WHERE blockchain_address = ?`,
      [userAddress]
    );
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createUser(
  username,
  blockchain_address,
  profile_pic,
  req,
  res
) {
  try {
    let result = await query(
      `INSERT INTO users
    VALUES (?, ?, ?, ?, DEFAULT)`,
      [uuid(), username, blockchain_address, profile_pic]
    );
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateUser(userId, username, req, res) {
  try {
    const updateResult = await query(
      `UPDATE users SET username = ? WHERE id = ?`,
      [username, userId]
    );

    if (updateResult.affectedRows === 0) {
      res.status(500).json({ message: "No rows were affected" });
      return;
    }

    let result = await query(`SELECT * FROM users WHERE id = ?`, [userId]);

    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
