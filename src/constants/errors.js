export const GLOBAL_ERRORS = {
  // Server error codes (text) are checked first

  // Global Auth
  INVALID_TOKEN: 'Your session has expired. Please log in again.',
  TOKEN_EXPIRE: 'Your session has expired. Please log in again.',
  UNAUTHORIZED: 'Your session has expired. Please log in and try again.',

  EMAIL_NOT_REGISTERED: 'Your email is not registered in our servers, please try signing up again.',

  INTERNAL_ERROR: 'Something went wrong on our end. Please try again later.',

  // HTTP response codes, checked second
  // 0 for network failed
  0: 'Unable to connect to server. Please check your internet connection.',
  401: 'Your session has expired. Please log in again.',
  404: 'Unable to find resource',
};
