export const GLOBAL_ERRORS = {
  // Global Auth
  INVALID_TOKEN: 'Your session has expired. Please log in again.',
  UNAUTHORIZED: 'You do not have permission to view this resource.',

  // Global Network/System
  ERR_NETWORK: 'Unable to connect to the server. Check your connection.',
  SERVER_ERROR: 'Something went wrong on our end. Please try again later.',

  // Common Validation (Defaults)
  INVALID_EMAIL: 'The email address provided is invalid.',
  REQUIRED_FIELD: 'This field is required.',
  0: 'Unable to connect to server. Please check your internet connection.',
  404: 'Not found :(',
  // TODO: Define other errors, including the default spring 400/401/etc.
};
