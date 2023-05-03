import axios from "axios"

export const API = axios.create({
  baseURL: "https://api.kontenbase.com/query/api/v1/6085eab7-994d-430c-8d75-6acda28137b6",
});

export function setAuthorization(token) {
    if (!token) {
      delete API.defaults.headers.common;
      return;
    }
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}