import { GLOBAL_ERRORS } from '../constants/errors';

/**
 * Resolves an API error object into a user-friendly string.
 * * @param {ApiError} error - The error object thrown by useApi
 * @param {Object} localOverrides - Optional dictionary of code -> message for this specific component
 */
export const getErrorMessage = (error, localOverrides = {}) => {
  // Safety check: if it's not ApiError return generic
  if (!error?.serverCode && !error?.message) {
    return GLOBAL_ERRORS.SERVER_ERROR;
  }

  const code = error.serverCode;
  const status = error.status;

  // Local Component Overrides
  // e.g. Login page says "Account not found" for INVALID_EMAIL
  if (localOverrides[code]) {
    return localOverrides[code];
  }

  // e.g. INVALID_TOKEN or ERR_NETWORK
  if (GLOBAL_ERRORS[code]) {
    return GLOBAL_ERRORS[code];
  }

  // Generic mappings for HTTP statuses
  if (GLOBAL_ERRORS[status]) {
    return GLOBAL_ERRORS[status];
  }

  // Server Message (Fallback)
  if (error.message) {
    return error.message;
  }

  return GLOBAL_ERRORS.SERVER_ERROR;
};
