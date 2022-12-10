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

const initialState = {
  listings: [],
  listing: {},
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LISTINGS_GET_ALL_REQUEST:
    case LISTING_GET_REQUEST:
    case LISTING_POST_REQUEST:
    case LISTING_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LISTINGS_GET_ALL_SUCCESS:
      return {
        ...state,
        listings: action.payload,
        loading: false,
        error: null,
      };
    case LISTING_GET_SUCCESS:
      return {
        ...state,
        listing: action.payload,
        loading: false,
        error: null,
      };
    case LISTING_POST_SUCCESS:
      return {
        ...state,
        listings: [...state.listings, action.payload],
        loading: false,
        error: null,
      };
    case LISTING_UPDATE_SUCCESS:
      // maybe check action.payload for delete and remove or update depending
      return {
        ...state,
        listings: state.listings.map((listing) =>
          listing._id === action.payload._id ? action.payload : listing
        ),
        loading: false,
        error: null,
      };
    case LISTINGS_GET_ALL_FAIL:
    case LISTING_GET_FAIL:
    case LISTING_POST_FAIL:
    case LISTING_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
