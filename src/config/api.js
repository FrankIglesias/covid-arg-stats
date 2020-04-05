
import { create } from 'apisauce';

const api = create({
  baseURL: process.env.REACT_APP_AUTH_API_BASE_URL,
  timeout: 15000
});


export default api;
