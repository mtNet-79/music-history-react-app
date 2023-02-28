import reducer from "../reducers";
// import middleware from "../middleware";
// import { legacy_createStore as createStore } from "redux";


// export const store = createStore(reducer, middleware);


import logger  from "../middleware/logger";
import thunk from "redux-thunk";
import { loadingBarMiddleware } from 'react-redux-loading-bar'


import { configureStore } from '@reduxjs/toolkit'


export const setupStore = initState => {
  return configureStore({
    reducer: reducer,
    middleware: [thunk, logger, loadingBarMiddleware()],
    preloadedState: initState 
  })
}

export const store = setupStore({})

// console log the store object
console.log("STATE : ", store.getState());
