import { connect } from "react-redux";
import { handleAddComposer } from "../../actions/addComposer";
// import { handleAddPerfomer } from "../actions/addPerformer";
import { Fragment, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

const ComposerPage = (props) => {
  const navigate = useNavigate();
  let params = useParams();

  const { c_id } = params;
  const { dispatch, authedUser, composers, users } = props;

  useEffect(() => {
    const validComposerlIds = Object.keys(composers);
    const cidIsValid =
      validComposerlIds.filter((vcid) => vcid === c_id).length > 0
        ? true
        : false;
    cidIsValid ? void 0 : navigate("/error");
  }, [c_id, composers, navigate]);

  const usersFavorties = users[authedUser].composers;
  var hasFav = usersFavorties ? true : false;

  //   const handleComposerClick = (e) => {
  //     if (e.target.id === OPTION_ONE)
  //       dispatch(handleAnswerComposer(authedUser, pid, OPTION_ONE));
  //     else if (e.target.id === OPTION_TWO)
  //       dispatch(handleAnswerComposer(authedUser, pid, OPTION_TWO));
  //     navigate(`/questions/${pid}`);
  //   };
  return (
    <Fragment>
      <h3>Composer by {users[composers[c_id]?.author]?.name}</h3>
      <br></br>
      {users[composers[c_id]?.author]?.avatarURL ? (
        <img
          src={users[composers[c_id]?.author]?.avatarURL}
          alt={`Avatar of ${composers[c_id]?.author}`}
          className="avatar center"
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="avatar"
        >
          <path d="M320 336C333.3 336 344 346.7 344 360C344 373.3 333.3 384 320 384H192C178.7 384 168 373.3 168 360C168 346.7 178.7 336 192 336H320zM136.4 224C136.4 210.7 147.1 200 160.4 200C173.6 200 184.4 210.7 184.4 224C184.4 237.3 173.6 248 160.4 248C147.1 248 136.4 237.3 136.4 224zM80 224C80 179.8 115.8 144 160 144C204.2 144 240 179.8 240 224C240 268.2 204.2 304 160 304C115.8 304 80 268.2 80 224zM160 272C186.5 272 208 250.5 208 224C208 197.5 186.5 176 160 176C133.5 176 112 197.5 112 224C112 250.5 133.5 272 160 272zM376.4 224C376.4 237.3 365.6 248 352.4 248C339.1 248 328.4 237.3 328.4 224C328.4 210.7 339.1 200 352.4 200C365.6 200 376.4 210.7 376.4 224zM432 224C432 268.2 396.2 304 352 304C307.8 304 272 268.2 272 224C272 179.8 307.8 144 352 144C396.2 144 432 179.8 432 224zM352 176C325.5 176 304 197.5 304 224C304 250.5 325.5 272 352 272C378.5 272 400 250.5 400 224C400 197.5 378.5 176 352 176zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464z" />
        </svg>
      )}

      <h3>Would you rather?</h3>
      <br></br>
    </Fragment>
  );
};

ComposerPage.propTypes = {
  authedUser: PropTypes.string.isRequired,
  composers: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired,
};

const mapStateToProps = ({ authedUser, composers, users }, props) => {
  const { image } = props;

  return {
    authedUser,
    composers,
    users,
    image,
  };
};

export default connect(mapStateToProps)(ComposerPage);
