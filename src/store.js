//import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import reducer from './reducer';
//import rootSaga from './rootSaga';
//import createSagaMiddleware from 'redux-saga';

import loggerMiddleware from './middleware/logger';
import monitorReducerEnhancer from './enhancers/monitorReducer';
import { composeWithDevTools } from 'redux-devtools-extension';



export default function configureStore(preloadedState) {
  const routingMiddleware = routerMiddleware(history);
  const middlewares = [loggerMiddleware, routingMiddleware, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, monitorReducerEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(reducer, preloadedState, composedEnhancers);

  return store;
}




