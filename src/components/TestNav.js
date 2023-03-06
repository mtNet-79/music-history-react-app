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
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <NavLink className="navbar-brand" to="/">
            🔥
          </NavLink>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            {request.endpoint === "composers"? (
              <>
                <li className="nav-li">
                  <form
                    className="search"
                    method="post"
                    action="/venues/search"
                  >
                    <input
                      className="form-control"
                      type="search"
                      name="search_term"
                      placeholder="Find a venue by name"
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
                    id="locationForm"
                    method="post"
                    action="/venues/search/location"
                  >
                    <select
                      className="form-control"
                      name="search_location_term"
                      aria-label="Select"
                      id="location_search"
                    ></select>
                  </form>
                </li>
              </>
            ) : null}
            {request.endpoint === "artists" ||
            request.endpoint === "search_artists" ||
            request.endpoint === "show_artist" ||
            request.endpoint === "location_artist" ? (
              <>
                <li className="nav-li">
                  <form
                    className="search"
                    method="post"
                    action="/artists/search"
                  >
                    <input
                      className="form-control"
                      type="search"
                      name="search_term"
                      placeholder="Find an artist by name"
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
                    id="locationForm"
                    method="post"
                    action="/artists/search/location"
                  >
                    <select
                      className="form-control"
                      name="search_location_term"
                      aria-label="Select"
                      id="location_search"
                    ></select>
                  </form>
                </li>
              </>
            ) : null}
          </ul>
          <ul className="nav navbar-nav">
            <li className={request.endpoint === "venues" ? "active" : ""}>
              <NavLink to="/venues">Venues</NavLink>
            </li>
            <li className={request.endpoint === "artists" ? "active" : ""}>
              <NavLink to="/artists">Artists</NavLink>
            </li>
            <li className={request.endpoint === "shows" ? "active" : ""}>
              <NavLink to="/shows">Shows</NavLink>
            </li>
          </ul>
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
