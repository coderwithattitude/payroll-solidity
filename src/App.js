// @flow

import * as React from 'react';
import { Router, browserHistory, Redirect, Switch } from 'react-router';
import { HashRouter, BrowserRouter /*, Router*/, Route } from 'react-router-dom';

import { IntlProvider } from 'react-intl';
import { IntlProvider as RSIntlProvider } from 'rsuite';

import { DrizzleProvider } from 'drizzle-react';
import { LoadingContainer } from 'drizzle-react-components';
import { Provider } from 'react-redux';
import enGB from 'rsuite/lib/IntlProvider/locales/en_GB';
import locales from './locales';
import routes from './routes';
import { store } from './store';
import drizzleOptions from './drizzleOptions';
import LoadingBar from 'react-redux-loading-bar';

import Frame from './components/Frame';
import SignUp from './components/SignUp';
import Home from './components/Home';

type Props = {};

const extractAppRoute = (route, parent) => {
  let routes = [];

  const one = {};
  let path = route.path;
  path =path && path[0] !== '/' ? '/'+path : path;
  
  if (path && path !== '/') {
    one.path = parent ? parent+path : path;
    one.path = '/app'+one.path;
  }
  route.component? one.component = route.component : '';

  if (one.path && one.component) {
    routes.push(one);
  }
  let children = [];
  if (route.childRoutes) {
    children = Object.keys(route.childRoutes).map ( childKey => extractAppRoute(route.childRoutes[childKey], path));
  }
  routes = routes.concat(children).flat();
  return routes;
}

const AdvancedRoutes = props => {
  return props.routes.map( route => {
    const props = {
      key: route.path,
      path: route.path,
      component: route.component 
    };
    route.exact ? props.exact = route.exact : null;
    return <Route  {...props} />
  }) || <div></div>;
}

const extractedRoute = extractAppRoute(routes);

class App extends React.Component<Props> {
  render() {
    return (
      <DrizzleProvider  options={drizzleOptions}>
        <LoadingContainer>
          <Provider store={store}>
            <HashRouter>
              <div>
                <LoadingBar scope='first'/>
                <Switch>
                  <Redirect exact from='/' to='/home' />
                  <Redirect exact from='/app' to='/app/list/members' />
                </Switch>
              <Route path='/signup' component={SignUp} />
                <Route path='/home' component={Home} />
                <Route path='/app' render= { props =>
                  <Frame {...props} >
                    {
                      <AdvancedRoutes routes={extractedRoute} />
                    }
                  </Frame>
                } />
              </div>
          </HashRouter>
        </Provider>
        </LoadingContainer>
      </DrizzleProvider>

    );
  }
}

export default App;
