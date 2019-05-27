// @flow

import * as React from 'react';
import { Redirect, Switch } from 'react-router';
import { HashRouter,Route } from 'react-router-dom';


import { Provider } from 'react-redux';
import routes from './routes';

import DrizzleComponent from './components/DrizzleComponent';
import Frame from './components/Frame';
import SignUp from './components/SignUp';
import Home from './components/Home';

type Props = {};

const extractAppRoute = (route, parent) => {
  let routes = [];

  const one = {};
  let path = route.path;
  path = path && path[0] !== '/' ? '/' + path : path;
  
  if (path && path !== '/') {
    one.path = parent ? parent + path : path;
    one.path = '/app' + one.path;
  }
  route.component ? one.component = route.component : '';

  if (one.path && one.component) {
    routes.push(one);
  }
  let children = [];
  if (route.childRoutes) {
    children = Object.keys(route.childRoutes).map ( childKey => extractAppRoute(route.childRoutes[childKey], path));
  }
  routes = routes.concat(children).flat();
  return routes;
};

const AdvancedRoutes = props => {
  return props.routes.map( route => {
    const props = {
      key: route.path,
      path: route.path,
      component: route.component 
    };
    route.exact ? props.exact = route.exact : null;
    return <Route  {...props} />;
  }) || <div></div>;
};

const extractedRoute = extractAppRoute(routes);

class App extends React.Component<Props> {
  render() {
    return (
      <HashRouter>
        <div>
          <Switch>
            <Redirect exact from='/' to='/home' />
            <Redirect exact from='/app' to='/app/list/members' />
          </Switch>
          <Route path='/home' component={Home} />
          <Route path='/signup' render= { props =>
              DrizzleComponent(SignUp)(props)
            }
          />
          <Route path='/app' render= { props =>
            localStorage.getItem('user')
              ? <Frame {...props} >
                {
                  <AdvancedRoutes routes={extractedRoute} />
                }
               </Frame>
              : <Redirect exact to={{ pathname: '/home', state: { from: props.location } }} />
          } />
        </div>
      </HashRouter>
    );
  }
}

export default App;
