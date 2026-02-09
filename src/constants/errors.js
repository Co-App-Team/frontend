export const GLOBAL_ERRORS = {
  // Global Auth
  INVALID_TOKEN: 'Your session has expired. Please log in again.',
  TOKEN_EXPIRE: 'Your session has expired. Please log in again.',

  INTERNAL_ERROR: 'Something went wrong on our end. Please try again later.',

  // HTTP response codes (0 for network failed)
  0: 'Unable to connect to server. Please check your internet connection.',
  401: 'Your session has expired. Please log in again.',
  404: 'Unable to find resource',
  // TODO: Define other errors, including 400/401/etc.
};
