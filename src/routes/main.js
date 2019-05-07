import Frame from '../components/Frame';
export default {
  onEnter: (nextState, replace) => {
    console.log('router  main');
  },
  component: Frame,
  childRoutes: [require('./profile'),require('./list'),require('./error'),require('./noemps'),require('./history')]
};
