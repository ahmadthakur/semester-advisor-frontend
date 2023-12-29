import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ isLoggedIn, children }) => {
  const location = useLocation();

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
