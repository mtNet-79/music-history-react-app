import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Composer = (props) => {
  const navigate = useNavigate();
  const { composer } = props;
  const showComposer = () => {
    navigate(`/composers/${composer.id}`);
  };
  return (
    <div className="composer-box">
      <div>{composer.name}</div>
      <div>{formatDate(composer.timestamp)}</div>
      <button className="btn" onClick={showComposer}>
        Show Composer
      </button>
    </div>
  );
};

Composer.propTypes = {
  composer: PropTypes.object.isRequired,
};

const mapStateToProps = ({ composers }, { id }) => {
  const composer = composers[id];
  return {
    composer,
  };
};

export default connect(mapStateToProps)(Composer);
