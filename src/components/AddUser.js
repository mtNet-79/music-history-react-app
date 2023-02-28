import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { handleAddUser } from "../actions/addUser";
import PropTypes from 'prop-types';
// WHEN PAGE OPENS RENDER NEW USER OBJ WITH NEW RANDOM IMAGE
// IF USER SUBMITS NAME AND PASSWORD ADD TO THE OBJECT THEN SUBMIT THE OBJECT TO DISPATCH
const LogIn = (props) => {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [formReady, setFormReady] = useState(false);

  const navigate = useNavigate();

  const { dispatch, image, users } = props;  

  const checkForm = (e) => {
    if (e.target.id === "fullName") setFullName(e.target.value);
    if (e.target.id === "userName") {
      Object.keys(users).forEach((userId) => {
        userName === userId 
            ? alert('This user name is already taken.')
            : setUserName(e.target.value);
      })
      setUserName(e.target.value);
    }
    else if (e.target.id === "password") setPassword(e.target.value);
    if (fullName !== "" && password !== "" && password.length > 5)
      setFormReady(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      userName 
        ? dispatch(handleAddUser({fullName, image, password, userName})) 
        : dispatch(handleAddUser({fullName, image, password, users}))    
    navigate("/");
  };

  return (
    <div className="container">
      <img src={image} alt="description" className="avatar" />
      <div>
        <form onSubmit={handleSubmit} className="add-new">
          <label htmlFor="fullName" className="form-label center">
            Full name:
          </label>
          <input
            placeholder="Full Name"
            type="text"
            name="fullName"
            id="fullName"
            value={fullName}
            onChange={checkForm}
          />
          <label htmlFor="userName" className="form-label center">
            User name:
          </label>
          <input
            placeholder="User Name"
            type="text"
            name="userName"
            id="userName"
            value={userName}
            onChange={checkForm}
          />
          <label htmlFor="password" className="form-label center">
            Password
          </label>
          <input
            placeholder="Password"
            type="text"
            name="password"
            id="password"
            value={password}
            onChange={checkForm}
          />
          <button
            type="submit"
            className="btn add-new-btn"
            disabled={!formReady}
          >
            Add New User
          </button>
        </form>
      </div>
    </div>
  );
};

LogIn.propTypes = {
  users: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired,
}

const mapStateToProps = ({ authedUser, users }, { image }) => ({
  authedUser,
  image,
  users,
});
export default connect(mapStateToProps)(LogIn);
