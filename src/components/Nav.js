import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";
import PropTypes from "prop-types";
import "../styles/nav.scss";

const Nav = (props) => {
  // console.log("nav props: ", props);
  const { dispatch, users, authedUser } = props;
  const user = users[authedUser];
  const location = useLocation();
  const currentEndpoint = location.pathname;

  const hanldeLogOutOnClick = () => {
    dispatch(setAuthedUser());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-custom">
      <div className="container-fluid">
        <div className="navbar-header">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <NavLink to="/" className="navbar-brand">
            🎻
          </NavLink>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {currentEndpoint.startsWith("/composers/") ||
              (currentEndpoint.startsWith("/performers") && (
                <>
                  <li className="nav-li">
                    <form
                      className="search"
                      method="post"
                      action={
                        currentEndpoint.startsWith("/composers/")
                          ? "/composers/search"
                          : "/performers/search"
                      }
                    >
                      <input
                        className="form-control"
                        type="search"
                        name="search_term"
                        placeholder={`Find a ${
                          currentEndpoint.startsWith("/composers/")
                            ? "composer"
                            : "performer"
                        } by name`}
                        aria-label="Search"
                      />
                    </form>
                  </li>
                  <li className="nav-li">
                    <div className="inrow-span"> or </div>
                  </li>
                  <li className="nav-li">
                    <form
                      className="search"
                      id="periodForm"
                      method="post"
                      action={
                        currentEndpoint.startsWith("/composers/")
                          ? "/composers/search/period"
                          : "/performers/search/period"
                      }
                    >
                      <select
                        className="form-control"
                        name="search_period_term"
                        aria-label="Select"
                        id="period_search"
                      ></select>
                    </form>
                  </li>
                </>
              ))}

            <li className="nav-item">
              <NavLink to="/composers" className="nav-link">
                Composers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/performers" className="nav-link">
                Performers
              </NavLink>
            </li>
            {authedUser && (
              <li className="nav-item">
                <NavLink to="/favorites" className="nav-link">
                  Favorites
                </NavLink>
              </li>
            )}
          </ul>
          {authedUser ? (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={props.users[authedUser].avatarURL}
                    alt="avatar"
                    className="avatar-small"
                  />
                  <span>{authedUser}</span>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link
                      to="/"
                      onClick={hanldeLogOutOnClick}
                      className="dropdown-item"
                    >
                      Log Out
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            // <div className="nav-item ms-auto" style={{ margin: "12px", marginLeft: "auto"}}>
            //   <Link to="/login" className="nav-link btn-primary btn" style={{ color: "blue" }}>
            //     Sign In
            //   </Link>
            // </div>
            <div className="nav-item ms-auto" style={{ marginLeft: "auto" }}>
              <Link
                to="/login"
                className="nav-link btn btn-primary sign-in-btn"
                style={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ padding: "0.5rem 1.5rem" }}>Sign In</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

Nav.propTypes = {
  authedUser: PropTypes.string,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  users,
});

export default connect(mapStateToProps)(Nav);
