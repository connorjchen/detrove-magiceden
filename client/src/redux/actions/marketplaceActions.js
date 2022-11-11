import Axios from "axios";
import {
  GET_LISTINGS_REQUEST,
  GET_LISTINGS_SUCCESS,
  GET_LISTINGS_FAIL,
} from "../constants/marketplaceConstants";
import { baseUrl } from "./constants";

export const getListings = () => async (dispatch) => {
  dispatch({ type: GET_LISTINGS_REQUEST });
  try {
    const { data } = await Axios.get(`${baseUrl}/marketplace/listings`);
    dispatch({ type: GET_LISTINGS_SUCCESS, payload: data.result });
  } catch (error) {
    let message = error.response
      ? error.response.status + " " + error.response.data.message
      : error.message;
    dispatch({
      type: GET_LISTINGS_FAIL,
      payload: message,
    });
  }
};
