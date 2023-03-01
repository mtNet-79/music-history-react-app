// import PollBox from "./PollBox";
import { connect } from "react-redux";
import { useState } from "react";
import Switch from "./Switch";
import PollContainer from "./PollContainer";
import PropTypes from "prop-types";

const Dashboard = (props) => {
  const { users, authedUser, performers, composers } = props;

  const [toggleValue, setToggleValue] = useState(true);

  const handleToggle = (e) => {
    setToggleValue(!toggleValue);
  };


  const unansweredPollsSorted =
    answeredPolls.length !== 0
      ? pollIds.filter((pid) => !answeredPolls.includes(pid))
      : pollIds;

  const answeredPollsSorted = answeredPolls.sort(
    (a, b) => polls[b].timestamp - polls[a].timestamp
  );
  return (
    <div className="container">
      <div className="poll-container">
        <div className="flex-row">
          {authedUser ? (
            <>
              <div className="cell">
                <Switch isOn={toggleValue} handleToggle={handleToggle} />
              </div>
              <div className="cell">
                {toggleValue ? (
                  <h2 className="polls-header center">New Polls</h2>
                ) : (
                  <h2 className="polls-header center">Answered Polls</h2>
                )}
              </div>
            </>
          ) : (
            <h2 className="polls-header center">New Polls</h2>
          )}
        </div>
        {authedUser ? (
          toggleValue ? (
            <PollContainer polls={unansweredPollsSorted} answered={!toggleValue} />
          ) : (
            <PollContainer
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
  polls: PropTypes.object.isRequired,
  authedUser: PropTypes.string,
  users: PropTypes.object.isRequired,
  pollIds: PropTypes.arrayOf(PropTypes.string)
}
const mapStateToProps = ({ polls, authedUser, users }) => ({
  authedUser,
  pollIds: Object.keys(polls).sort(
    (a, b) => polls[b].timestamp - polls[a].timestamp
  ),
  users,
  polls,
});
export default connect(mapStateToProps)(Dashboard);
