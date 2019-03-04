// @flow

import * as React from 'react';
import { Router, browserHistory, Redirect, Switch } from 'react-router';
import { HashRouter, BrowserRouter /*, Router*/, Route } from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";

import { IntlProvider } from 'react-intl';
import { IntlProvider as RSIntlProvider } from 'rsuite';

import enGB from 'rsuite/lib/IntlProvider/locales/en_GB';
import locales from './locales';
import routes from './routes';

import Frame from './components/Frame';

type Props = {};

const history = createBrowserHistory();
// const history = browserHistory;

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
        <IntlProvider locale="en" messages={locales.en}>
          <RSIntlProvider locale={enGB}>
              <HashRouter>
                <Frame>
                  <div>
                      <Switch>
                        <Redirect exact from='/' to='/list/members' />
                      </Switch>
                      {
                        <AdvancedRoutes routes={extractedRoute} />
                      }
                    </div>
                  </Frame>
                </HashRouter>
          </RSIntlProvider>
        </IntlProvider>
    );
  }
}

export default App;
