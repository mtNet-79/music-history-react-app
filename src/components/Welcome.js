import PropTypes from "prop-types";
import { connect } from "react-redux";

const Welcome = (props) => {
  const { authedUser } = props;


  return (
    <section role="region" aria-label="Main Content">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="text-center mb-5">Music History</h1>
            <figure className="border rounded mb-4">
              <img
                src="images/musichall.jpg"
                alt="Photo of music hall"
                className="w-100"
              />
            </figure>
          </div>
          <div className="col-lg-12">
            <section aria-labelledby="text-heading">
              <h2 id="text-heading">Welcome!</h2>
              {authedUser ? (
                <p>Enjoy!</p>
                
              ) : (
                <>
                  {" "}
                  <p>
                    Please, use the application to explore European historical
                    music!
                  </p>{" "}
                  <p>
                    Log in to keep track of your favorites and to add your own
                    composers and performers
                  </p>
                </>
              )}
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

Welcome.propTypes = {
  authedUser: PropTypes.string,
};
const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});
export default connect(mapStateToProps)(Welcome);
