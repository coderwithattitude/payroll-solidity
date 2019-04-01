import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { drizzleReducers } from 'drizzle';
import { loadingBarReducer } from 'react-redux-loading-bar';
import org from './reducers/org';
const reducer = combineReducers({
  routing: routerReducer,
  ...drizzleReducers,
  org,
  loadingBar: loadingBarReducer
});

export default reducer;