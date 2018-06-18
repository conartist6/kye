import { createStore as createStoreRedux, applyMiddleware, compose, combineReducers } from 'redux';
import gameMiddleware from './middlewares/game';
import thunk from 'redux-thunk';
import game from './game';

const rootReducer = combineReducers({
  game,
});

export function createStore() {
  const enhancers = [];
  const middleware = [thunk, gameMiddleware];

  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

  return createStoreRedux(rootReducer, {}, composedEnhancers);
}
