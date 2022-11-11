import { query } from "../db.js";
import { getListings as listingServicesGetListings } from "./listingServices.js";

async function getListings(sneakerId, req, res) {
  await listingServicesGetListings(sneakerId, req, res);
}

export { getListings };
