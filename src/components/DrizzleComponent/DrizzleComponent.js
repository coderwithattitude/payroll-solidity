import React from 'react';
import { DrizzleProvider } from 'drizzle-react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import drizzleOptions from '../../drizzleOptions';

const DrizzleComponent = (WrappedComponent) => props => {

  return (
    <DrizzleProvider  options={drizzleOptions}>
      <Provider store={store}>
          <WrappedComponent store={store} {...props} />
      </Provider>
    </DrizzleProvider>
  );
}

export default DrizzleComponent;
