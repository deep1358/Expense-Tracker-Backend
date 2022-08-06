import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from './user/index';
import expense from './expense/index';
import utils from './utils/index';

const reducer = combineReducers({
  user,
  expense,
  utils
});

const store = configureStore({ reducer });

export default store;
