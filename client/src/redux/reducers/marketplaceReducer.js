import {
  GET_LISTINGS_REQUEST,
  GET_LISTINGS_SUCCESS,
  GET_LISTINGS_FAIL,
} from "../constants/marketplaceConstants";

const initialState = {
  listings: [],
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LISTINGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_LISTINGS_SUCCESS:
      return {
        ...state,
        listings: action.payload,
        loading: false,
        error: null,
      };
    case GET_LISTINGS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
