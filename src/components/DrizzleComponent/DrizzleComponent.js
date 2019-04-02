import React from 'react';
import { DrizzleProvider } from 'drizzle-react';
import { LoadingContainer } from 'drizzle-react-components';
import { Provider } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';

import { store } from '../../store';
import drizzleOptions from '../../drizzleOptions';

const ReduxContext = React.createContext({
  store
});

const DrizzleComponent = (WrappedComponent) => props => {

  return (
        <DrizzleProvider  options={drizzleOptions}>
          <LoadingContainer>
            <Provider store={store} >
              <div>
                <LoadingBar scope='first'/>
                <WrappedComponent context={ReduxContext} {...props} />
              </div>
            </Provider>
          </LoadingContainer>
        </DrizzleProvider>
  );
}

export default DrizzleComponent;
