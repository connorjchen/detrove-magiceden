import { query } from "../db.js";
import { v4 as uuid } from "uuid";
import {
  getSneaker as productServicesGetSneaker,
  getUnlistedNfts as productServicesGetUnlistedNfts,
} from "./productServices.js";

export async function getSneaker(sneakerId, req, res) {
  await productServicesGetSneaker(sneakerId, req, res);
}

export async function getUnlistedNfts(
  userId,
  sneakerId,
  ownedNftAddresses,
  req,
  res
) {
  await productServicesGetUnlistedNfts(
    userId,
    sneakerId,
    ownedNftAddresses,
    req,
    res
  );
}

export async function createListing(
  nftId,
  sellerId,
  price,
  startDate,
  endDate,
  req,
  res
) {
  try {
    let result = await query(
      `INSERT INTO listings
    VALUES (?, ?, ?, ?, ?, ?, DEFAULT, DEFAULT, DEFAULT)`,
      [uuid(), nftId, sellerId, price, startDate, endDate]
    );
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
