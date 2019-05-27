import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { drizzleReducers } from 'drizzle';
import { loadingBarReducer } from 'react-redux-loading-bar';
import emps from './reducers/emps';
import orgs from './reducers/orgs';
import alert from './alert';
const reducer = combineReducers({
  routing: routerReducer,
  ...drizzleReducers,
  loadingBar: loadingBarReducer,
  emps,
  orgs,
  alert
});

export default reducer;