import React from 'react';
import { DrizzleProvider } from 'drizzle-react';
import { LoadingContainer } from 'drizzle-react-components';
import { Provider } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';

import { store } from '../../store';
import drizzleOptions from '../../drizzleOptions';

const DrizzleComponent = (WrappedComponent) => props => {

  return (
        <DrizzleProvider  options={drizzleOptions}>
          <Provider store={store}>
            <LoadingContainer>
              <LoadingBar scope='first'/>
              <WrappedComponent store={store} {...props} />
            </LoadingContainer>
          </Provider>
        </DrizzleProvider>
  );
}

export default DrizzleComponent;
