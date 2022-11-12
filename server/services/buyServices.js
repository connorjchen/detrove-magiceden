import { query } from "../db.js";
import {
  getSneaker as productServicesGetSneaker,
  getListings as productServicesGetListings,
} from "./productServices.js";

export async function getSneaker(sneakerId, req, res) {
  await productServicesGetSneaker(sneakerId, req, res);
}

export async function getListings(sneakerId, req, res) {
  await productServicesGetListings(sneakerId, req, res);
}
