import { combineReducers } from "redux";

import marketplaceReducer from "./marketplaceReducer";
import requestsReducer from "../helpers/requestsReducer";
import searchReducer from "./searchReducer";
import productReducer from "./productReducer";
import buyReducer from "./buyReducer";
import sellReducer from "./sellReducer";
import profileReducer from "./profileReducer";
import listingReducer from "./listingReducer";

export const reducers = combineReducers({
  requests: requestsReducer,
  marketplace: marketplaceReducer,
  search: searchReducer,
  product: productReducer,
  buy: buyReducer,
  sell: sellReducer,
  profile: profileReducer,
  listing: listingReducer,
});
