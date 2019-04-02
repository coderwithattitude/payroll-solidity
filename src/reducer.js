import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { drizzleReducers } from 'drizzle';
import { loadingBarReducer } from 'react-redux-loading-bar';
import emps from './reducers/emps';
const reducer = combineReducers({
  emps,
  routing: routerReducer,
  ...drizzleReducers,
  loadingBar: loadingBarReducer
});

export default reducer;