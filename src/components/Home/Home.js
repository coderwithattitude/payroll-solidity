// @flow

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import {
  Button,
  Container,
  Sidebar,
  Sidenav,
  Icon,
  Header,
  Content,
  Dropdown,
  Nav,
  DOMHelper
} from 'rsuite';

import { pageview } from '../../tracker';

const { getHeight, on } = DOMHelper;

type State = {
  windowHeight: number
};

class Home extends React.Component<Props, State> {
  resizeListenner = null;

  static propTypes = {
    location: PropTypes.object.isRequired
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      windowHeight: getHeight(window),
      expand: true
    };
    this.resizeListenner = on(window, 'resize', this.updateHeight);
  }
  updateHeight = () => {
    this.setState({
      windowHeight: getHeight(window)
    });
  };

  componentWillUnmount() {
    if (this.resizeListenner) {
      this.resizeListenner.off();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      pageview();
    }
  }

  render() {
    const { children } = this.props;
    const { windowHeight } = this.state;

    return (
      <Container className="home">
        Home
      </Container>
    );
  }
}

export default withRouter(Home);
