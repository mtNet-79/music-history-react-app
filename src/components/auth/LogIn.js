import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { autoComplete } from "../../utils/helpers";
import { setAuthedUser } from '../../actions/authedUser';
import PropTypes from "prop-types";
import LoginWithGoogle from './LoginWithGoogle';

const LogIn = ({ image, users}) => {
  const [formReady, setFormReady] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const redirectedFrom = state?.from 
  
  
  const authedUser = useSelector((state) => state.authedUser);
  const dispatch = useDispatch();
  const userRef = useRef("");
  const passwordRef = useRef("");

  useEffect(() => {
    if (authedUser) {
      const { from } = redirectedFrom || { from: { pathname: "/" } };
      navigate(redirectedFrom);
    }
  }, [authedUser, navigate, redirectedFrom]);


  const checkForm = (e) => {
    if (e.target.id === "userName") autoComplete(e.target, users);

    if (
      userRef.current.value !== "" &&
      passwordRef.current.value !== "" &&
      passwordRef.current.value.length > 5
    ) {
      setFormReady(true);
    } else {
      setFormReady(false);
    }
  };

  const showUsers = (e) => {
    autoComplete(e.target, users);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users[userRef.current.value];

    if (user) {
      if (user.password === passwordRef.current.value) {
        dispatch(setAuthedUser(userRef.current.value));
        redirectedFrom ? navigate(redirectedFrom) : navigate("/");
      } else {
        alert("Wrong password. Try again.");
      }
    } else {
      alert("This account does not exist. Add New User.");
    }
  };

  return (
    <div className="container">
      <img src={image} alt="description" className="mx-auto avatar" />
      {/* <div class="d-flex justify-content-center align-items-center"> */}
      <form onSubmit={handleSubmit} className="add-new d-flex flex-column">
        <div className="mb-3">
          <div className="form-text autocomplete">
            <label htmlFor="userName" className="form-label center">
              User
            </label>

            <input
              placeholder="User Name"
              type="text"
              name="userName"
              id="userName"
              ref={userRef}
              onChange={checkForm}
              onClick={showUsers}
              autoComplete="off"
              className="form-control"
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label center">
            Password
          </label>
          <input
            placeholder="Password"
            type="text"
            name="password"
            id="password"
            ref={passwordRef}
            onChange={checkForm}
            className="form-control"
          />
        </div>
        <button
          type="submit"
          className="btn my-btn btn-primary log-in-button"
          disabled={!formReady}
        >
          Log In
        </button>
      </form>

      <Link
        to="/add-user"
        className="btn my-btn add-new-btn btn-success"
        value="Add New User"
      >
        Create account
      </Link>
      <LoginWithGoogle redirectedFrom={redirectedFrom} />
    </div>
    // </div>
  );
};

LogIn.propTypes = {
  image: PropTypes.string.isRequired,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = ({ users }, { image }) => ({
  image,
  users,
});

export default connect(mapStateToProps)(LogIn);
