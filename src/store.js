//import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux'
import reducer from './reducer';
//import rootSaga from './rootSaga';
//import createSagaMiddleware from 'redux-saga';
import { generateContractsInitialState } from 'drizzle';
import drizzleOptions from './drizzleOptions';

// instantiate redux devtools to visualize state
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//const history = createHistory();

// instantiate middleware objects "react-router": "3.2.0",
const routingMiddleware = routerMiddleware(history);
//const sagaMiddleware = createSagaMiddleware();

const initialState = {
  contracts: generateContractsInitialState(drizzleOptions)
};

const store = createStore(
    reducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware,
        routingMiddleware
      // sagaMiddleware
    )
  )
);
//sagaMiddleware.run(rootSaga);

//export { history };
export { store };

export default store;

