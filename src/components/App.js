import { Routes, Route } from "react-router-dom";
// import '../styles/App.css';
//TODO: import all primary endpoint view components to set up routes
import ComposerAddForm from "./ComposerAddForm";
import ComposersContainer from "./ComposersContainer";
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
import Welcome from "./Welcome";
import { ToastContainer } from "react-toastify";
import { OAuthPopup } from 'OAuth2Popup';

function App(props) {
  const [image, setImage] = useState("");
  const { dispatch, authedUser, loading } = props;

  useEffect(() => {
    dispatch(handleInitialData());
    const alreadyLoggedIn = () => {
      console.log("LOGGED IN");
    };
    const logInUser = () => console.log("LOG IN");
    authedUser === null ? logInUser() : alreadyLoggedIn();
  }, [dispatch, authedUser]);

  return (
    <Fragment>
      <LoadingBar />
      {loading ? null : (
        <Fragment>
          <ToastContainer />
          <Routes>
            <Route element={<OAuthPopup />} path="/callback" />
            <Route path="/add-user" element={<AddUser image={image} />} />
            <Route path="/login" element={<LogIn image={image} />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Welcome />} />
              <Route path="composers/" element={<ComposersContainer />} />
              <Route element={<RequireAuth />}>
                <Route path="composers/create" element={<ComposerAddForm />} />
                {/* <Route path="leaderboard" element={<Leaderboard />} /> */}
                <Route path="composers/:cid" element={<ComposerPage image={image} />} />
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
  console.log("APP COMPOSERs: ", composers);
  return {
    loading,
    authedUser,
  };
};

export default connect(mapStateToProps)(App);
