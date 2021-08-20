import { combineReducers } from 'redux';
import { PageReducer } from './Page';

export const RootReducer = combineReducers({
  pageReducer: PageReducer,
});
