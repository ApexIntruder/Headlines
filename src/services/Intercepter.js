import axios from 'axios';
import { API_KEY, BASE_URL } from '../config';

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  transformRequest: [
    function (data, headers) {
      if (API_KEY) {
        headers['X-API-Key'] = `${API_KEY}`;
      } if (data && data._parts) {
        return data;
      } else {
        return JSON.stringify(data);
      }
    },
  ],
  headers: { 'Content-Type': 'application/json' },
});


AxiosInstance.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
})

AxiosInstance.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (!error.response) {
    return Promise.reject({
      status: 'failure',
      message: 'check your internet connection',
    });
  } else {
    return error.response;
  }
})


export default AxiosInstance;
