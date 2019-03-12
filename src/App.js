// @flow

import * as React from 'react';
import { Router, browserHistory, Redirect, Switch } from 'react-router';
import { HashRouter, BrowserRouter /*, Router*/, Route } from 'react-router-dom';

import { IntlProvider } from 'react-intl';
import { IntlProvider as RSIntlProvider } from 'rsuite';

import { DrizzleProvider } from 'drizzle-react';
import { Provider } from 'react-redux';
import enGB from 'rsuite/lib/IntlProvider/locales/en_GB';
import locales from './locales';
import routes from './routes';
import { store } from './store';
import drizzleOptions from './drizzleOptions';

import Frame from './components/Frame';
import Home from './components/Home';

type Props = {};

const extractRoute = (route, parent) => {
  let routes = [];

  const one = {};
  let path = route.path;
  path =path && path[0] !== '/' ? '/'+path : path;
  
  if (path && path !== '/') {
    one.path = parent ? parent+path :path
  }
  route.component? one.component = route.component : '';

  if (one.path && one.component) {
    routes.push(one);
  }
  let children = [];
  if (route.childRoutes) {
    children = Object.keys(route.childRoutes).map ( childKey => extractRoute(route.childRoutes[childKey], path));
  }
  routes = routes.concat(children).flat();
  return routes;
}

const AdvancedRoutes = props => {
  return props.routes.map( route => <Route exact={route.exact} key={route.path} path={route.path} component={route.component} />) || <div></div>;
}

const extractedRoute = extractRoute(routes);

class App extends React.Component<Props> {
  render() {
    return (
      <DrizzleProvider  options={drizzleOptions}>
        <Provider store={store}>

          <HashRouter>
            <div>
              <Route path='/home' component={Home} />
              <Frame>
                <div>
                  <Switch>
                    <Redirect exact from='/' to='/home' />
                  </Switch>
                  {
                    <AdvancedRoutes routes={extractedRoute} store={store} />
                  }
                </div>
              </Frame>
            </div>
          </HashRouter>
        </Provider>
      </DrizzleProvider>

    );
  }
}

export default App;
