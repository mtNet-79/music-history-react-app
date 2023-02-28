import { showLoading, hideLoading } from "react-redux-loading-bar";
import { getInitialData } from "../utils/api";
// import { setAuthedUser } from "./authedUser";

export const RECEIVE_DATA = "RECIVE_DATA";
// const AUTHED_ID = "mthornton";

/*
composers and performers are the most complex datasets, 
they have several many-to-mamny relationships with other datasets.
styles and titles also have a couple many-to-many relationships (performers, composers)
yet are very limited in size and very small growth potential.
compositions and recordings are less complex in that they have  a one-to-many 
relaitonship with composers and performers, respectively. but will be used in various components
and both have very good growth potential

*/

export const recieveData = (
  users,
  composers,
  performers,
  styles,
  titles,
  compositions,
  recordings
) => ({
  type: RECEIVE_DATA,
  users,
  composers,
  performers,
  styles,
  titles,
  compositions,
  recordings,
});

export const handleInitialData = () => {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(
      ({
        users,
        composers,
        performers,
        styles,
        titles,
        compositions,
        recordings,
      }) => {
        // dispatch(setAuthedUser(AUTHED_ID));
        console.log("AT DISPATCH INPUT: ", composers)
        dispatch(
          recieveData(
            users,
            composers,
            performers,
            styles,
            titles,
            compositions,
            recordings
          )
        );
        dispatch(hideLoading());
      }
    );
  };
};
