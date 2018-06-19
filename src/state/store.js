import { createStore as createStoreRedux, applyMiddleware, compose, combineReducers } from 'redux';
import gameMiddleware from './middlewares/game';
import thunk from 'redux-thunk';
import game from './game';
import os from './os';

const rootReducer = combineReducers({
  game,
  os,
});

export function createStore(initialState = {}) {
  const enhancers = [];
  const middleware = [thunk, gameMiddleware];

  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers,
  );

  return createStoreRedux(rootReducer, initialState, composedEnhancers);
}
