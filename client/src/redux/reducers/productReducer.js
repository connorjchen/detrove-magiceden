import { defaultSneaker } from "../constants";
import { RequestsEnum } from "../helpers/requestsEnum";

const initialState = {
  sneaker: defaultSneaker,
  listings: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RequestsEnum.productGetSneaker:
      return {
        ...state,
        sneaker: action.payload,
      };

    case RequestsEnum.productGetListings:
      return {
        ...state,
        listings: action.payload,
      };
    default:
      return state;
  }
};
