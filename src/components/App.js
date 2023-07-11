import { Routes, Route } from "react-router-dom";

// Primary endpoint view components
import ComposerAddForm from "./composer/ComposerAddForm";
import ComposersContainer from "./composer/ComposersContainer";
import AuthRedirect from "./auth/AuthRedirect";
// import CallbackComponent from "./auth/TokenExchange";
import ComposerPage from "./composer/ComposerPage";
import NotFound from "./NotFound";
import RequireAuth from "./wrappers/RequireAuth";
import Layout from "./wrappers/Layout";
import LogIn from "./auth/LogIn";
import AddUser from "./AddUser";
import Welcome from "./Welcome";


// Hooks
import { useState, useEffect, Fragment } from "react";

// Redux
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
// import { handleFetchLogo } from '../actions/fetchLogo';

// Others
import PropTypes from "prop-types";
import LoadingBar from "react-redux-loading-bar";
import { ToastContainer } from "react-toastify";



function App(props) {
  const [image, setImage] = useState("");
  const { dispatch, authedUser, loading } = props;

  useEffect(() => {
    dispatch(handleInitialData());
    // dispatch(handleFetchLogo());
    const alreadyLoggedIn = () => {
      console.log("YOU ARE LOGGED IN");
    };
    const logInUser = () => console.log("LOG IN REQUIRED");
    authedUser === null ? logInUser() : alreadyLoggedIn();
  }, [dispatch, authedUser]);

  return (
    <Fragment>
      <LoadingBar />
      {loading ? null : (
        <Fragment>
          <ToastContainer />
            <Routes>
            <Route path="/callback" element={<AuthRedirect />} />
            <Route path="/add-user" element={<AddUser image={image} />} />
            <Route path="/login" element={<LogIn image={image} />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Welcome />} />
              <Route path="composers/" element={<ComposersContainer />} />
              <Route element={<RequireAuth />}>
                <Route path="composers/create" element={<ComposerAddForm />} />
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
  return {
    loading,
    authedUser,
  };
};

export default connect(mapStateToProps)(App);
