import Composer from "./Composer";
import PropTypes from 'prop-types';

const ComposersContainer = ({ composers }) => {
  return (
    <>
      {composers.length !== 0 ? (        
          <ul className="flex-row-wrap">
            {composers.map((id) => (
              <li key={id}>
                <Composer id={id} />
              </li>
            ))}
          </ul>
      ) : (
        <div>
         
            <span className="composers-header center">
              There are no composers to view
            </span>
          
        </div>
      )}
    </>
  );
};

ComposersContainer.propTypes = {
  composers: PropTypes.array.isRequired
}

export default ComposersContainer;
