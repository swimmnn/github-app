import {ApiConfig, TApiConfigHeadersProps} from "./api.config";

const headers: TApiConfigHeadersProps = {
  ["Content-Type"]: "application/json;charset=UTF-8"
};
const baseUrl = "https://api.github.com/";

export const http = new ApiConfig({
  baseUrl,
  config: {
    headers
  }
});
