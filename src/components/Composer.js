import { connect } from "react-redux";
// import { formatDate } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

const Composer = (props) => {
  const navigate = useNavigate();
  const { composer, authedUser, users } = props;
  const showComposer = () => {
    navigate(`/composers/${composer.id}`);
  };
  const user = authedUser ? users[authedUser] : null;
  console.log("user is ", user);

  const isLiked = authedUser
    ? users[authedUser].favorite_composers[composer.id]
      ? true
      : false
    : false;

  console.log("isLiked is ", composer);

  return (
    <div
      className="d-flex border border-secondary rounded my-1 p-2"
      role="article"
      tabIndex="0"
      onClick={showComposer}
    >
      <div className="col-3 border border-secondary">
        <img
          src={composer?.image}
          alt="sm-p "
          className="portrait-small"
        />
        {authedUser && (
        <FontAwesomeIcon
          icon={isLiked ? faHeart : farHeart}
          className={`ms-auto ${isLiked ? "text-danger" : ""}`}
          role="img"
          aria-label={isLiked ? "Liked" : "Not liked"}
        />
      )}
      </div>
      <div className="col-9 px-1">
        <div className="flex-grow-1">{composer.name}</div>
        <div>
          {composer.birthdate.toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
          })}{" "}
          -{" "}
          {composer.deathdate.toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>

     
    </div>
  );
};

Composer.propTypes = {
  composer: PropTypes.object.isRequired,
  authedUser: PropTypes.string,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = ({ composers, authedUser, users }, { id }) => {
  console.log("id is : ", id);
  console.log("composer is : ", composers[id]);
  console.log("composers are : ", composers);
  const composer = composers[id];
  return {
    composer,
    authedUser,
    users,
  };
};

export default connect(mapStateToProps)(Composer);
