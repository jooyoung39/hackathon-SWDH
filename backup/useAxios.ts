import axios, { AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
  baseURL: 'https://careus-api.lunabi.co.kr/',
};

const useAxios = axios.create(axiosConfig);

export default useAxios;
