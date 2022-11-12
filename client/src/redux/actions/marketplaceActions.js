import Axios from "axios";
import {
  GET_LISTINGS_REQUEST,
  GET_LISTINGS_SUCCESS,
  GET_LISTINGS_FAIL,
} from "../constants/marketplaceConstants";
import { apiBaseUrl } from "./constants";

const baseUrl = `${apiBaseUrl}/marketplace`;

export const getListings = () => async (dispatch) => {
  dispatch({ type: GET_LISTINGS_REQUEST });
  try {
    const { data } = await Axios.get(`${baseUrl}/listings`);
    dispatch({ type: GET_LISTINGS_SUCCESS, payload: data.result });
  } catch (error) {
    dispatch({
      type: GET_LISTINGS_FAIL,
      payload: error.response?.data?.message ?? error.message,
    });
  }
};
