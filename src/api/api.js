// Developed in part using Gemini, see https://gemini.google.com/share/10616c57b393 for details.

import axios from 'axios';

let authFailedCallback = null;

export const setAuthFailedCallback = (callback) => {
  authFailedCallback = callback;
};

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosClient.defaults.withCredentials = true;

// 1. Custom Error Class (Keeps things consistent)
export class ApiError extends Error {
  constructor(message, status, serverCode, data = null) {
    super(message); // "Readable" response from server for fallback
    this.name = 'ApiError';
    this.status = status; // HTTP Status
    this.serverCode = serverCode; // Server code, like: "ACCOUNT_NOT_ACTIVATED", etc.
    this.data = data; // Full response data
  }
}

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status || 0;
    const responseData = error.response?.data || {};

    console.log('Got response data: ' + JSON.stringify(responseData));

    if (status === 401) {
      // Fire the auth failed callback
      if (authFailedCallback) {
        authFailedCallback();
      }
    }

    // Fallback message sent from server, if all goes well we get:
    // {
    // "error":"SERVER_CODE",
    // "message":"Some detailed message"
    //}
    // If the server has no endpoint defined we'll get something like:
    //{
    // "timestamp":"xyz",
    // "status":404,
    // "error":"Not Found",
    // "path":"/api/path/to/endpoint"
    //}
    // When we can't connect to the server, we get error.message = "Network error"
    const fallbackMessage =
      responseData.message || responseData.error || error.message || 'Unknown Error';

    // The server error code ("ACCOUNT_NOT_ACTIVATED")
    const serverCode = responseData.error || null;

    // 3. Reject with all the info
    return Promise.reject(new ApiError(fallbackMessage, status, serverCode, responseData));
  },
);

export default axiosClient;
