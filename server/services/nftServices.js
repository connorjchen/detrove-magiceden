import { query } from "../db.js";

async function getAll() {
  const result = await query("SELECT * FROM nfts");

  return { result };
}

async function create(id, name) {
  const result = await query("INSERT INTO nfts (id, name) VALUES (?, ?)", [
    id,
    name,
  ]);

  let message = "Error in creating NFT";
  if (result.affectedRows) {
    message = "NFT created successfully";
  }

  return { message };
}

export default { getAll, create };
