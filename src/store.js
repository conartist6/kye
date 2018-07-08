import { compose, applyMiddleware, createStore as createStoreRedux } from 'redux';
import gameMiddleware from './state/middlewares/game';
import thunk from 'redux-thunk';
import rootReducer from './state';

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
