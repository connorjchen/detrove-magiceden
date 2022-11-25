import { RequestsEnum } from "../helpers/requestsEnum";

const initialState = {
  user: null,
  items: [],
  activeListings: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RequestsEnum.profileGetUser:
      return {
        ...state,
        user: action.payload,
      };
    case RequestsEnum.profileGetItems:
      return {
        ...state,
        items: action.payload,
      };
    case RequestsEnum.profileGetActiveListings:
      return {
        ...state,
        activeListings: action.payload,
      };
    default:
      return state;
  }
};
