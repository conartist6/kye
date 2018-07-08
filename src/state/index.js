import { combineReducers } from 'redux';
import { namespaced } from 'redux-subspace';
import game from './game';
import fun, { hydrate as hydrateFun } from 'fun-web-os/lib/state';

export default combineReducers({ fun: namespaced('fun')(fun), game });

export function hydrate(state) {
  return {
    fun: hydrateFun(state.fun),
  };
}
