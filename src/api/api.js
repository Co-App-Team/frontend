// Base api calls done here

import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8080/api', // TODO: Dummy URL, replace with actual backend URL
});

let authFailedCallback = null;

export const setAuthFailedCallback = (callback) => {
  authFailedCallback = callback;
};

// Intercept 401s to handle auth failures globally
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // Fire the auth failed callback
      if (authFailedCallback) {
        authFailedCallback();
      }
    }
    return Promise.reject(error);
  },
);

const request = async (options) => {
  const onSuccess = (response) => {
    const { data } = response;
    return data;
  };

  const onError = (error) => {
    return Promise.reject({
      message: error.message,
      code: error.code,
      response: error.response,
    });
  };

  return client(options).then(onSuccess).catch(onError);
};

export const get = async (url, config = {}) => {
  const options = {
    method: 'GET',
    url,
    ...config,
  };
  return request(options);
};

export const post = async (url, data = {}, config = {}) => {
  const options = {
    method: 'POST',
    url,
    data,
    ...config,
  };
  return request(options);
};
