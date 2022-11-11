import { query } from "../db.js";

async function getSneakers(nftAddresses, req, res) {
  // REPLACE QUERY
  try {
    const result = await query("SELECT * FROM listings");
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getWatchlist(userId, req, res) {
  // REPLACE QUERY
  try {
    const result = await query("SELECT * FROM listings");
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getUser(userAddress, req, res) {
  try {
    const result = await query(
      "SELECT * FROM users WHERE blockchain_address = ?",
      [userAddress]
    );
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateUser(userAddress, username, req, res) {
  try {
    const result = await query("UPDATE ");
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { getSneakers, getWatchlist, getUser, updateUser };
