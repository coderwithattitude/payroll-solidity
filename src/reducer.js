import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { drizzleReducers } from 'drizzle';
import web3Reducer from './utils/web3/web3Reducer';
const reducer = combineReducers({
    routing: routerReducer,
    ...drizzleReducers,
    web3: web3Reducer
});

export default reducer;