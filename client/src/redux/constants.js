// export const apiBaseUrl = "http://localhost:5000/api";
export const apiBaseUrl =
  "https://nlaol79agi.execute-api.us-east-1.amazonaws.com/dev/api";

export const s3BaseUrl = "https://detrove-s3-images.s3.amazonaws.com";
export const s3Object = (key) => `${s3BaseUrl}/${key}`;

export const defaultSneaker = {
  id: "unknown",
  brand: "unknown",
  colorway: "unknown",
  description: "unknown",
  gender: "unknown",
  name: "unknown",
  release_date: "unknown",
  retail_price: "unknown",
  style_code: "unknown",
};
