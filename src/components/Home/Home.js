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
  FlexboxGrid,
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
const contactNumber = '+2348056556566';
const contactEmail = 'hello@daipay.com';
const contactSocial = {
  twitter: '',
  linkedin: '',
  github: 'https://github.com/renown-fruit/dai-payroll',
  reddit: ''
}

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
      <div className="home">
        <Container className="top">
          <Navbar className="navbar">
            <Navbar.Header>
              <a href="/" className="navbar-brand logo">
                <h2>Daipay</h2>
              </a>
            </Navbar.Header>
            <Navbar.Body>
              <Nav pullRight>
                <Nav.Item >Contact Us</Nav.Item>
                <Nav.Item className="call2action" href="/signup">
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
                  <Link to="/signup">
                    <Button appearance="primary" color="green" className="spread-button tight-border">
                      Create a free account
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Grid>
            <Grid fluid className="features">
              <Row>
                <Col xs={24} sm={24} md={7} className="box tight-border">
                  <Icon icon="clock-o" size="3x"/>
                  <h3>Save Time</h3>
                  <p>
                    Pay multiple addresses at once with no hassle
                  </p>
                </Col>
                <Col xs={24} sm={24} md={7}  mdOffset={1} className="box tight-border">
                  <Icon icon="bars" size="3x"/>
                  <h3>Zero Volatility</h3>
                  <p>
                    Pay employees with stable coins
                  </p>
                </Col>
                <Col xs={24} sm={24} md={7}  mdOffset={1} className="box tight-border">
                  <Icon icon="th-list" size="3x"/>
                  <h3>Work Time calculator</h3>
                  <p>
                    Calculate and pay for hours worked
                  </p>
                </Col>
              </Row>
            </Grid>
            <Grid fluid className="screenshot">
              <Row>
                <Col xs={24} sm={24} md={12} >
                  <FlexboxGrid align="middle">
                    <FlexboxGrid.Item colspan={24}>
                      <Icon icon="clock-o" size="5x"/>
                      <h2>Built for small and large crypto teams around the world</h2>
                      <p>
                        Daipay is built to cater for paying workers of both small and large teams around the world.
                      </p>
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                </Col>
              </Row>
            </Grid>
          </Content>
        </Container>
        <Container className="bottom">
          <Content>
            <Grid fluid className="callout">
              <Row>
                <Col md={12} mdOffset={6} >
                  <Row>
                    <Col md={12}>
                      <h2>Start paying your employees with Daipay</h2>
                    </Col>
                    <Col md={12}>
                      <Link to="/signup">
                        <Button appearance="primary" color="green" className="spread-button tight-border">
                          Create a free account
                        </Button>
                      </Link>
                  </Col>
                  </Row>
                </Col>
              </Row>
            </Grid>
            <Grid fluid className="footer">
              <Row className="details">
                <Col xs={24} md={6} mdOffset={3}>
                  <h4>Daipay</h4>
                  <p>
                    131, Herbert Macaulay Road,<br/>
                    Sabo, Yaba area, Lagos.,<br/>
                    Nigeria.
                  </p>
                </Col>
                <Col xs={24} md={4} mdOffset={2}>
                  <h4>Contact Us</h4>
                  <p>
                    <a href={`tel:`+contactNumber} > {contactNumber} </a><br/>
                    <a href={`mailto:`+contactEmail} > {contactEmail} </a><br/>
                  </p>
                </Col>
                <Col xs={24} md={7} mdOffset={2} className="social">
                  <h4>Social</h4>
                  <p>
                  
                    <a href={contactSocial.twitter} target="_blank"><Icon icon="twitter-square" size="2x"/></a>
                    <a href={contactSocial.linkedin} target="_blank"><Icon icon="linkedin-square" size="2x"/></a>
                    <a href={contactSocial.github} target="_blank"><Icon icon="github-square" size="2x"/></a>
                    <a href={contactSocial.square} target="_blank"><Icon icon="reddit-square" size="2x"/></a>
                  </p>
                </Col>
              </Row>
            </Grid>
            <Grid className="copyright">
              <Row>
                <Col md={24}>
                  <h4>Copyright 2018, Daipay</h4>
                </Col>
              </Row>
            </Grid>
          </Content>
        </Container>
      </div>
    );
  }
}

export default withRouter(Home);