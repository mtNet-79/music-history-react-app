import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import PropTypes from "prop-types";

const Nav = (props) => {
  // console.log("nav props: ", props);
  const { dispatch, users, authedUser } = props;
  const user = users[authedUser];

  const hanldeLogOutOnClick = () => {
    dispatch(setAuthedUser());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
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
        <div className="collapse navbar-collapse" id="navbarNav">
          {authedUser ? (
            <>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                </li>
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
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <img
                    src={user.avatarURL}
                    alt="icon"
                    className="avatar-small"
                  />
                  <span>{user.id}</span>
                </li>
                <li>
                  <Link
                    to="/"
                    onClick={hanldeLogOutOnClick}
                    className="nav-link"
                  >
                    Log out
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            // <div className="nav-item ms-auto" style={{ margin: "12px", marginLeft: "auto"}}>
            //   <Link to="/login" className="nav-link btn-primary btn" style={{ color: "blue" }}>
            //     Sign In
            //   </Link>
            // </div>
            <div className="nav-item ms-auto" style={{ marginLeft: "auto" }}>
            <Link to="/login" className="nav-link btn-primary btn sign-in-btn" style={{ color: "white", display: "flex", alignItems: "center"}}>
              <span style={{ padding: "0.5rem 1.5rem"}}>Sign In</span>
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
