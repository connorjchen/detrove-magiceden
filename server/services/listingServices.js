import { query } from "../db.js";

async function getAll() {
  const result = await query("SELECT * FROM listings");
  return { result };
}

async function create(id, nftId, price) {
  const result = await query(
    "INSERT INTO listings(id, nft_id, price) VALUES (?, ?, ?)",
    [id, nftId, price]
  );

  let message = "Error in creating listing";
  if (result.affectedRows) {
    message = "Listing created successfully";
  }

  return { message };
}

export default { getAll, create };
