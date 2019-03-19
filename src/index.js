import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import ready from './ready';
import App from './App';

import './styles/index.less';

const render = Component => {
  ReactDOM.render(<Component />, document.getElementById('root'));
};

if (HOT_PATCH_REQUIRED) {
  ready(() => {
    render(hot(module)(App));
  });
} else {
  ready(() => {
    render(App);
  });  
}

