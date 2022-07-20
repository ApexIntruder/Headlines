import AxiosInstance from './Intercepter';
import { BASE_URL } from '../config';

//Post Request
export async function post(api, data) {
  console.log(`${BASE_URL}${api}`);
  return AxiosInstance.post(`${BASE_URL}${api}`, data)
    .then(res => res.data)
    .catch(err => (err && err.response ? err.response : err));
}

//Get Request
export async function get(api, data) {
  //  debugger
  return AxiosInstance.get(`${BASE_URL}${api}`)
    .then(res => {
      if (res.status == 200 && !res.data.status) {
        return {
          ...res.data,
          status: 'success',
        };
      }
      return res.data;
    })
    .catch(err => err);
}
