import Axios from "axios";
import { apiBaseUrl } from "../constants";
import { requestHelper } from "../helpers/requestsHelpers";
import { RequestsEnum } from "../helpers/requestsEnum";

const baseUrl = `${apiBaseUrl}/profile`;

export const getUser = (userEmail) => async (dispatch) => {
  if (!userEmail) {
    return await requestHelper(
      dispatch,
      RequestsEnum.profileGetUser,
      async () => {
        dispatch({
          type: RequestsEnum.profileGetUser,
          payload: null,
        });
      }
    );
  } else {
    return await requestHelper(
      dispatch,
      RequestsEnum.profileGetUser,
      async () => {
        const { data } = await Axios.get(`${baseUrl}/user/${userEmail}`);
        dispatch({
          type: RequestsEnum.profileGetUser,
          payload: data.result,
        });
      }
    );
  }
};

export const getItems = (userId) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.profileGetItems,
    async () => {
      const { data } = await Axios.get(`${baseUrl}/items/${userId}`);
      dispatch({
        type: RequestsEnum.profileGetItems,
        payload: data.result,
      });
    }
  );
};

export const getActiveListings = (userId) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.profileGetActiveListings,
    async () => {
      const { data } = await Axios.get(`${baseUrl}/active/listings/${userId}`);
      dispatch({
        type: RequestsEnum.profileGetActiveListings,
        payload: data.result,
      });
    }
  );
};
