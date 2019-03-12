// @flow

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import {
  Button,
  Col,
  Container,
  Content,
  Sidebar,
  Sidenav,
  Icon,
  Header,
  Dropdown,
  Grid,
  Nav,
  Navbar,
  DOMHelper,
  Row,
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
        <Navbar className="navbar">
          <Navbar.Header>
            <a href="/" className="navbar-brand logo">
              <h2>Daipay</h2>
            </a>
          </Navbar.Header>
          <Navbar.Body>
            <Nav pullRight>
              <Nav.Item >Contact Us</Nav.Item>
              <Nav.Item className="call2action">
                <Button appearance="primary" color="green" className="spread-button tight-border">
                  Create a free account
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Body>
        </Navbar>
        <Content>
          <Grid fluid className="topInfo">
            <Row>
              <Col xs={24} sm={24} md={8}>
                <h1>Smart & Stable</h1>
                <h3>
                  way to pay workers of blockchain development teams.
                </h3>
                <Button appearance="primary" color="green" className="spread-button tight-border">
                  Create free account
                </Button>
              </Col>
            </Row>
          </Grid>
          <Grid fluid className="features">
            <Row gutter={60}>
              <Col xs={24} sm={24} md={8} className="box">
                <Icon icon="clock-o" size="5x"/>
                <h2>Save Time</h2>
                <p>
                  Pay multiple addresses at once with no hassle.
                </p>
              </Col>
              <Col xs={24} sm={24} md={8} className="box">
                <Icon icon="clock-o" size="5x"/>
                <h2>Save Time</h2>
                <p>
                  Pay multiple addresses at once with no hassle.
                </p>
              </Col>
              <Col xs={24} sm={24} md={8} className="box">
                <Icon icon="clock-o" size="5x"/>
                <h2>Save Time</h2>
                <p>
                  Pay multiple addresses at once with no hassle.
                </p>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default withRouter(Home);
