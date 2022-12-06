import Axios from "axios";
import { apiBaseUrl } from "../constants";
import { requestHelper } from "../helpers/requestsHelpers";
import { RequestsEnum } from "../helpers/requestsEnum";

const baseUrl = `${apiBaseUrl}/landing`;

const addEmail = (email) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.landingAddEmail,
    async () => {
      await Axios.post(`${baseUrl}/email`, { email });
    }
  );
};
export default addEmail;
