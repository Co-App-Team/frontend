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

*TODO: Write description*