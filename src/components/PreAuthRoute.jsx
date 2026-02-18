import { Navigate, Outlet } from 'react-router-dom';

const PreAuthRoute = ({ isAuthenticated }) => {
  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to="/"
      replace
    />
  );
};

export default PreAuthRoute;
