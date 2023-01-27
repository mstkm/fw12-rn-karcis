import axios from 'axios';
import {URL_BACKEND} from '@env';

const http = token => {
  const headers = {};
  if (token) {
    headers.authorization = 'Bearer ' + token;
  }
  const instance = axios.create({
    baseURL: URL_BACKEND,
    headers,
  });
  return instance;
};

export default http;
