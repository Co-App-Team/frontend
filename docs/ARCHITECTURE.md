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
├── contexts
├── hooks
└── pages
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

### 4. `contexts`

**Purpose**: Contains contexts for global state management.

---

### 5. `hooks`

**Purpose**: Contains [React hooks](https://www.w3schools.com/react/react_hooks.asp) for logic re-use.

---

### 6. `pages`

**Purpose**: Contains page components 

These components will represent pages in the app, from which all of displayed content will be rendered.
