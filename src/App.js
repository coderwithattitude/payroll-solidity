// @flow

import * as React from 'react';
import { Router, browserHistory } from 'react-router';
import { IntlProvider } from 'react-intl';
import { IntlProvider as RSIntlProvider } from 'rsuite';

import { DrizzleProvider } from 'drizzle-react';

import enGB from 'rsuite/lib/IntlProvider/locales/en_GB';
import locales from './locales';
import routes from './routes';
import { store } from './store';
import drizzleOptions from './drizzleOptions';

type Props = {};

class App extends React.Component<Props> {
  render() {
    return (
      <DrizzleProvider options={drizzleOptions} store={store}>
        
            <Router history={browserHistory} store={store} routes={routes} />
         
      </DrizzleProvider>
    );
  }
}

export default App;
