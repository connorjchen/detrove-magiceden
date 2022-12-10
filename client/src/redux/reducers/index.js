import { combineReducers } from "redux";

import ListingReducer from "./listingReducer";

export const reducers = combineReducers({ listings: ListingReducer });
