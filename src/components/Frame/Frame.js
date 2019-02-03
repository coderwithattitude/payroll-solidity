// @flow

import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
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
import HeaderAvatar from '../HeaderAvatar';
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
    link: '/dashboard'
  },
  {
    key: '3',
    text: 'Profile',
    icon: <Icon icon="user-o" />,
    link: '/error/404'
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
  static contextTypes = {
    router: PropTypes.object
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
            eventKey={item.key}
            placement="rightTop"
            trigger="hover"
            title="Errors"
            icon={item.icon}
          >
            {item.children.map(child => {
              return (
                <Dropdown.Item
                  key={child.key}
                  eventKey={child.key}
                  componentClass={Link}
                  to={child.link}
                  activeClassName="nav-item-active"
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
          eventKey={item.key}
          icon={item.icon}
          componentClass={Link}
          to={item.link}
          activeClassName="nav-item-active"
        >
          {item.text}
        </Nav.Item>
      );
    });
  }
  componentDidMount() {
    this.context.router.listen(() => {
      pageview();
    });
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
          <Sidenav expanded={expand} defaultOpenKeys={['3']} activeKey={[]} appearance="subtle">
            <Sidenav.Body style={navBodyStyle}>
              <Nav>
                {this.renderNavs()}
              </Nav>
              <div>
                <Button appearance={'primary'} className='signout' >
                  <Icon icon="sign-out"  /> Sign Out
                </Button>
              </div>
            </Sidenav.Body>
          </Sidenav>
          <NavToggle expand={expand} onChange={this.handleToggle} />
        </Sidebar>

        <Container className={containerClasses}>
          <HeaderAvatar />
          <Content>{children}</Content>
        </Container>
      </Container>
    );
  }
}

export default Frame;
