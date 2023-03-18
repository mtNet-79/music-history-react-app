import Composer from "./Composer";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ComposersContainer = ({ composers }) => {
  console.log("composer at container ", composers);
  const composer_ids = Object.keys(composers).map((key) => composers[key].id);
  console.log("composer_ids ", composer_ids);
  return (
    <section
      role="region"
      aria-label="main content"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="container">
        <div className="row justify-content-evenly">
          {composers.length !== 0 ? (
            composer_ids.map((id) => (
              <div key={id} className="col-sm-6 col-lg-4 mx-1 my-2">
                <Composer id={id} />
              </div>
            ))
          ) : (
            <div className="col text-center">
              <h2 className="fs-5 mb-0" aria-label="No composers to view">
                There are no composers to view
              </h2>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

ComposersContainer.propTypes = {
  composers: PropTypes.object.isRequired,
};

const mapStateToProps = ({ composers }) => {
  console.log("in props : ", composers);
  return {
    composers,
  };
};
export default connect(mapStateToProps)(ComposersContainer);
