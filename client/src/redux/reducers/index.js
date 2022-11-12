import { combineReducers } from "redux";

import MarketplaceReducer from "./marketplaceReducer";

export const reducers = combineReducers({
  marketplace: MarketplaceReducer,
});
