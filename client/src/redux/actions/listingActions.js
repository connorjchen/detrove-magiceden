import Axios from "axios";
import {
  LISTINGS_GET_ALL_REQUEST,
  LISTINGS_GET_ALL_SUCCESS,
  LISTINGS_GET_ALL_FAIL,
  LISTING_GET_REQUEST,
  LISTING_GET_SUCCESS,
  LISTING_GET_FAIL,
  LISTING_POST_REQUEST,
  LISTING_POST_SUCCESS,
  LISTING_POST_FAIL,
  LISTING_UPDATE_REQUEST,
  LISTING_UPDATE_SUCCESS,
  LISTING_UPDATE_FAIL,
} from "../constants/listingConstants";
import { baseUrl } from "./constants";

export const getAllListings = () => async (dispatch) => {
  dispatch({ type: LISTINGS_GET_ALL_REQUEST });
  try {
    const { data } = await Axios.get(`${baseUrl}/listings`);
    dispatch({ type: LISTINGS_GET_ALL_SUCCESS, payload: data.result });
  } catch (error) {
    dispatch({ type: LISTINGS_GET_ALL_FAIL, payload: error.message });
  }
};

export const getListing = (listingId) => async (dispatch) => {
  dispatch({ type: LISTING_GET_REQUEST });
  try {
    const { data } = await Axios.get(`${baseUrl}/listing/${listingId}`);

    dispatch({ type: LISTING_GET_SUCCESS, payload: data.result });
  } catch (error) {
    dispatch({ type: LISTING_GET_FAIL, payload: error.message });
  }
};

export const postListing = (nftId, price) => async (dispatch) => {
  dispatch({ type: LISTING_POST_REQUEST });
  try {
    const { data } = await Axios.post(`${baseUrl}/listing`, {
      nftId,
      price,
    });

    dispatch({ type: LISTING_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LISTING_POST_FAIL, payload: error.message });
  }
};

export const updateListing = (listingId, nftId, price) => async (dispatch) => {
  dispatch({ type: LISTING_UPDATE_REQUEST });
  try {
    const { data } = await Axios.patch(`${baseUrl}/listing`, {
      listingId,
      nftId,
      price,
    });

    dispatch({ type: LISTING_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LISTING_UPDATE_FAIL, payload: error.message });
  }
};
