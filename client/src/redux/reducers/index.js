import { combineReducers } from "redux";

import MarketplaceReducer from "./marketplaceReducer";
import RequestsReducer from "../helpers/requestsReducer";

export const reducers = combineReducers({
  requests: RequestsReducer,
  marketplace: MarketplaceReducer,
});
