import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { drizzleReducers } from 'drizzle';
import { loadingBarReducer } from 'react-redux-loading-bar';
import orgs from './reducers/orgs';
const reducer = combineReducers({
  routing: routerReducer,
  ...drizzleReducers,
  loadingBar: loadingBarReducer,
  orgs
});

export default reducer;