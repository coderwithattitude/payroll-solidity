import React from 'react';
import { DrizzleProvider } from 'drizzle-react';
import { LoadingContainer } from 'drizzle-react-components';
import { Provider } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import configureStore from '../../store';
import drizzleOptions from '../../drizzleOptions';
import { generateContractsInitialState } from 'drizzle';

const initialState = {
  contracts: generateContractsInitialState(drizzleOptions)
};

const store = configureStore(initialState);
const DrizzleComponent = (WrappedComponent) => props => {

  
  return (
        <DrizzleProvider  options={drizzleOptions}>
            <Provider store={store} >
              <div>
                <LoadingBar scope='first'/>
                <WrappedComponent {...props} reduxStore={store}/>
              </div>
            </Provider>
        </DrizzleProvider>
  );
}

export default DrizzleComponent;
