// @flow

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
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

import NavToggle from './NavToggle';
import { pageview } from '../../tracker';

const { getHeight, on } = DOMHelper;
const siderBarStyle = { display: 'flex', flexDirection: 'column', background: 'linear-gradient(77.17deg, #559FF7 -20.36%, #105FC7 114.13%)' };
const sideNavHeaderClass = { background: 'transparent' };
const sideNavIconClass = { margin: '68px 36px 96px', padding: '12px', minHeight: '72px', background: '#106ADE' };

const navs = [
  {
    key: '1',
    icon: <Icon icon="money" />,
    text: 'Payroll',
    link: '/list/members'
  },
  {
    key: '2',
    icon: <Icon icon="history" />,
    text: 'History',
    link: '/history'
  },
  {
    key: '3',
    text: 'Profile',
    icon: <Icon icon="user-o" />,
    link: '/noemps'
  }
];

type State = {
  windowHeight: number,
  expand: boolean
};

type Props = {
  children: React.Node
};

class Frame extends React.Component<Props, State> {
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
  handleToggle = () => {
    this.setState({
      expand: !this.state.expand
    });
  };

  componentWillUnmount() {
    if (this.resizeListenner) {
      this.resizeListenner.off();
    }
  }

  renderNavs() {
    return navs.map(item => {
      if (item.children) {
        return (
          <Dropdown
            key={item.key}
            placement="rightTop"
            trigger="hover"
            title="Errors"
            icon={item.icon}
          >
            {item.children.map(child => {
              return (
                <Dropdown.Item
                  key={child.key}
                  eventKey={child.link}
                  componentClass={Link}
                  to={child.link}
                >
                  {child.text}
                </Dropdown.Item>
              );
            })}
          </Dropdown>
        );
      }

      return (
        <Nav.Item
          key={item.key}
          eventKey={item.link}
          icon={item.icon}
          componentClass={Link}
          to={item.link}
        >
          {item.text}
        </Nav.Item>
      );
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      pageview();
    }
  }

  render() {
    const { children } = this.props;
    const { expand, windowHeight } = this.state;

    const containerClasses = classNames('page-container', {
      'container-full': !expand
    });

    let navBodyStyle = null;
    if (expand) {
      navBodyStyle = {
        height: windowHeight - 112,
        overflow: 'auto'
      };
    }

    return (
      <Container className="frame">
        <Sidebar style={siderBarStyle}
          width={expand ? 360 : 56}
          collapsible
        >
          <Sidenav.Header style={sideNavHeaderClass}>
            <div className="header-hrand" style={sideNavIconClass}>
              <Link to="/">
                <Icon icon="logo-analytics" size="lg" style={{ verticalAlign: 0, fontSize: '48px' }} />
                <div style={{ marginLeft: 12, display: 'inline-block' }}>
                  <h4 style={{ margin: 0 }}> Daipay</h4>
                  <small  style={{ margin: 0 }}> Next-gen payroll</small>
                </div>
              </Link>
            </div>
          </Sidenav.Header>
          <Sidenav expanded={expand} activeKey={this.props.location.pathname} appearance="subtle">
            <Sidenav.Body style={navBodyStyle}>
              <Nav>
                {this.renderNavs()}
              </Nav>
              {/* <div>
                <Button appearance={'primary'} className='signout' >
                  <Icon icon="sign-out"  /> Sign Out
                </Button>
              </div> */}
            </Sidenav.Body>
          </Sidenav>
          <NavToggle expand={expand} onChange={this.handleToggle} />
        </Sidebar>

        <Container className={containerClasses}>
          
          <Content>{children}</Content>
        </Container>
      </Container>
    );
  }
}

export default withRouter(Frame);
