import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

const RequireAuth = ({children}) => {
  const authedUser = useSelector((state) => state.authedUser);
  const location = useLocation();

  return authedUser ? (
    children ? children : <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
};

RequireAuth.propTypes = {
  children: PropTypes.element,
}

export default RequireAuth;
