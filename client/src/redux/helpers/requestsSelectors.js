// Extract request field from state
const requestState = (state) => state.requests;

export const requestsInProgress = (state) =>
  requestState(state).requests.filter((request) => request.inProgress).length >
  0;

// Get requests in progress either by single requestName or by requestNames array
export const namedRequestsInProgress = (
  state,
  requestName // RequestsEnum | RequestsEnum[]
) => {
  const singleNamedRequestInProgress = (singleRequestName) =>
    requestState(state).requests.find(
      (request) => request.name === singleRequestName && request.inProgress
    ) !== undefined;

  if (Array.isArray(requestName)) {
    return requestName.some(singleNamedRequestInProgress);
  }

  return singleNamedRequestInProgress(requestName);
};

export const namedRequestError = (state, requestName) =>
  requestState(state).requests.find(
    (request) => request.name === requestName && request.error !== null
  )?.error;
