// import PollBox from "./PollBox";
import { connect } from "react-redux";
import { useState } from "react";
import Switch from "./Switch";
import PollContainer from "./PollContainer";
import PropTypes from "prop-types";

const Dashboard = (props) => {
  const { users, authedUser, performers, composers, favorites } = props;

  const [toggleValue, setToggleValue] = useState(true);

  const handleToggle = (e) => {
    setToggleValue(!toggleValue);
  };


  return (
    <div className="container">
      <div className="row">
              <div className="col-6">
                <Switch isOn={toggleValue} handleToggle={handleToggle} />
              </div>
              <div className="col-6">
                {toggleValue ? (
                  <h2 className="display-2 fw-bold text-center text-primary mb-4">Composers</h2>
                ) : (
                  <h2 className="display-2 fw-bold text-center text-primary mb-4">
                    Performers
                  </h2>
                )}
              </div>
        {authedUser ? (
          toggleValue ? (
            <ComposerContainer composers={unansweredPollsSorted} answered={!toggleValue} />
          ) : (
            <PerformerContainer
              polls={answeredPollsSorted}
              answered={!toggleValue}
            />
          )
        ) : (
          <PollContainer polls={unansweredPollsSorted} answered={false} />
        )}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  composers:  PropTypes.arrayOf(PropTypes.string),
  authedUser: PropTypes.string,
  users: PropTypes.object.isRequired,
  performers: PropTypes.arrayOf(PropTypes.string),
  favorites: PropTypes.object.isRequired
}
const mapStateToProps = ({ performers, authedUser, users, composers }) => ({
  authedUser,
  composers,
  users,
  performers,
  favorites: users[authedUser].favorites
});
export default connect(mapStateToProps)(Dashboard);
