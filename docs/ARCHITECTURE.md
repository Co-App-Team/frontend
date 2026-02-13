# Project Package Structure

This document describes the initial frontend package structure for the **Co-App** React project. 
Co-App frontend follows a basic component/api architecture.

---

## High-Level Structure

```
src
├── main.jsx
├── App.jsx
├── App.css
├── index.css
│
├── api
├── assets
├── components
├── constants
├── contexts
├── hooks
├── pages
└── utils
```

---

## Package Breakdown

### 1. `api`

**Purpose**: JavaScript files for managing Axios API requests.

This folder contains a core `api.js` file that is used to send api requests, along with supporting `.js` files for different API endpoints.

---

### 2. `assets`

**Purpose**: Website assets

Contains images and other assets used by the site.

---

### 3. `components`

**Purpose**: Contains reusable components that make up the majority of the app.

---

### 4. `constants`

**Purpose**: Contains constant values to be used elsewhere. Includes error message mappings.

---

### 5. `contexts`

**Purpose**: Contains contexts for global state management.

---

### 6. `hooks`

**Purpose**: Contains [React hooks](https://www.w3schools.com/react/react_hooks.asp) for logic re-use.

---

### 7. `pages`

**Purpose**: Contains page components 

These components will represent pages in the app, from which all of displayed content will be rendered.

---

### 8. `utils`

**Purpose**: Files containing utility functions for logic reuse, that aren't React hooks.

## Page Routing

Page routing is managed by [React Router](https://reactrouter.com/). 

To define new routes:

1. Decide if the route needs protection (requires the user to be authenticated)
2. If the route needs protection, add it in the sub-group of routes, below the comment `{/* Protected (requires auth) routes */}` in [App.jsx](../src/App.jsx)
3. If the route is unprotected, add it in the main group of routes below `{/* Unprotected routes */}` that includes the `NotFoundPage` route

## API Calls

API calls in the app are made through an error handling axios wrapper formed by `/api/api.js`, `/utils/errorUtils.js`, `/hooks/useApi.js` and `/constants/errors.js`. 

This wrapper serves several important functions:
1. Response Interception
2. Error Translation
3. A hook for using API calls in components

### Response Interception

An axios interceptor intercepts all error responses, updating the auth context when a `401` is recieved, and selecting the most appropriate fallback error message to use.

Fallback error message priority is as follows:
1. Server provided error messages, the `message` field in the below example response:
```json
{
  "error":"ACCOUNT_NOT_ACTIVATED",
  "message":"The account has not yet been activated."
}
```
2. Server provided Spring default response, `error` field in the below example response:
```json
{
  "timestamp":"xyz",
  "status":404,
  "error":"Not Found",
  "path":"/api/path/to/endpoint"
}
```
3. The axios provided message
4. Returning "Unknown Error"

### Error Translation 

`getErrorMessage` in `/utils/errorUtils.js` defines a function that will map server error messages (like `ACCOUNT_NOT_ACTIVATED`) to readable messages for the UI.

The function takes the thrown error from `useApi`, and returns an error message with the following priorities:
1. Component specified overrides. If the component calling `getErrorMessage` passes in overrides, such as `ACCOUNT_NOT_ACTIVATED: "Some error message"`, those overrides will checked first.
2. Global error mappings defined in `/constants/errors.js`, based on the string error message returned by the server
3. Global error mappings defined in `/constants/errors.js`, based on the HTTP error code returned by the server (ex: `404`)
4. The fallback message set by the axios interceptor
5. `GLOBAL_ERRORS.SERVER_ERROR` from `/constants/errors.js`

### `useApi` Hook

The `useApi` hook in `/hooks/useApi.js` defines a useful wrapper for API requests returning state like response data, loading state, and error messages.

### Example of use

Example use of the wrapper can be seen below:

```js
const errorMappings = {
  REQUEST_HAS_NULL_OR_EMPTY_FIELD: 'Incorrect email or password',
  INVALID_EMAIL_OR_PASSWORD: 'Incorrect email or password',
  ACCOUNT_NOT_ACTIVATED: 'Please activate your account',
};

const LoginPage = () => {
  // "login" is a function that calls /api/auth/login defined in /api/authApi.js
  const { request: loginCallback } = useApi(login);

  const submit = async () => {
    try {
      await loginCallback(email, password);
      // On success code below
    } catch (error) {
      // Error is an instance ApiError defined in /api/api.js
      // Translated error message
      const message = getErrorMessage(error, errorMappings);

      if (error.status === 400) {
        // Per HTTP code mappings can be done like this
      }
    }
  };

  // ..... rest of component
  return (
    <>
      { /* Some JSX here */}
    </>);
}
```

The `useApi` hook also returns `data, loading, error`, which are state variables that will be updated as the request happens, providing an alternate way to use the hook for different use cases.