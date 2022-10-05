import axios from "axios";

export const useAxios = axios.create({
  baseURL: "https://careus-api.lunabi.co.kr/",
});
