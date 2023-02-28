import { Routes, Route } from "react-router-dom";
// import '../styles/App.css';
//TODO: import all primary endpoint view components to set up routes
import ComposerAddForm from "./ComposerAddForm";
//import basic hooks
import { useState, useEffect, Fragment } from "react";
import ComposerPage from "./ComposerPage";
import NotFound from "./NotFound";
import RequireAuth from "./wrappers/RequireAuth";
import Layout from "./wrappers/Layout";
import { connect } from "react-redux";
import LogIn from "./LogIn";
// import Leaderboard from "./Leaderboard";
import AddUser from "./AddUser";
import PropTypes from "prop-types";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading-bar";
// import axios from 'axios';
//TODO: import iitidl data load functionality :
//   import { handleInitialData } from "../actions/shared";
//TODO: possibly if adding Redux load connect from react-redux
//   import { connect } from "react-redux";
//TODO: LogIn, Leaderboard and Dashboard for game,
//  AddUser, NotFound, ./wrappers/RequiredAuth, .wrappers/Layout components :

//TODO: Add type checking for props with :
//  import PropTypes from 'prop-types';
//TODO: ADD LoadingBar functionality with :
//  import LoadingBar from "react-redux-loading-bar";
//TODO : map state to props with connect otherwise import authedUser and loading

function App(props) {
  const [image, setImage] = useState("");
  const { dispatch, authedUser, loading } = props;

  useEffect(() => {
    dispatch(handleInitialData());
    const alreadyLoggedIn = () => {
      console.log("LOGGED IN")
    };
    const logInUser = () => console.log("LOG IN");
    authedUser === null ? logInUser() : alreadyLoggedIn();
  }, [dispatch, authedUser]);

  return (
    <Fragment>
      <LoadingBar />

      {loading ? null : (
        <Fragment>
          <Routes>
            <Route path="/add-user" element={<AddUser image={image} />} />
            <Route path="/login" element={<LogIn image={image} />} />
            <Route path="/" element={<Layout />}>
              {/* <Route index element={<Dashboard />} /> */}
              <Route element={<RequireAuth />}>
                <Route path="composers/create" element={<ComposerAddForm />} />
                {/* <Route path="leaderboard" element={<Leaderboard />} /> */}
                <Route
                  path="composers/:cid"
                  element={<ComposerPage image={image} />}
                />
              </Route>
            </Route>
            <Route
              path="*"
              element={
                <RequireAuth>
                  <NotFound />
                </RequireAuth>
              }
            />
          </Routes>
        </Fragment>
      )}
    </Fragment>
  );
}

App.propTypes = {
  authedUser: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ authedUser, loading, composers }) => {
  console.log("APP COMPOSERs: ", composers)
  return {
    loading,
    authedUser,
  };
};

export default connect(mapStateToProps)(App);
