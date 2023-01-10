import axios from 'axios';

const http = token => {
  const headers = {};
  if (token) {
    headers.authorization = 'Bearer ' + token;
  }
  const instance = axios.create({
    baseURL: 'http://localhost:8888',
    headers,
  });
  return instance;
};

export default http;
