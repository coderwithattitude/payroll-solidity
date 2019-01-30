import React, { Component } from 'react';
import { Sidenav,Sidebar,Nav,Icon,Dropdown,Container,Content,DOMHelper } from 'rsuite';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import 'rsuite/dist/styles/rsuite.min.css';

const { getHeight, on} = DOMHelper;

const navs = [
  {
    key: '1',
    icon: <Icon icon="dashboard" />,
    text: 'Dashboard',
    link: '/dashboard'
  },
  {
    key: '2',
    icon: <Icon icon="group" />,
    text: 'Members',
    link: '/list/members'
  },
  {
    key: '3',
    text: 'Errors',
    icon: <Icon icon="exclamation-triangle" />,
    children: [
      {
        key: '3-1',
        text: '404',
        link: '/error/404'
      },
      {
        key: '3-1',
        text: '500',
        link: '/error/500'
      }
    ]
  }
];


class Dashboard extends Component {

  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.state = {
      windowHeight: getHeight(window),
      expand: true
    };
    this.resizeListener = on(window, 'resize', this.updateHeight);
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
    
    return(
      <Container className="frame">
        <Sidebar
          style={{ display: 'flex', flexDirection: 'column' }}
          width={expand ? 260 : 56}
          collapsible
        >
          <Sidenav.Header>
            <div className="header-hrand">
              <Link to="/">
                <Icon icon="logo-analytics" size="lg" style={{ verticalAlign: 0 }} />
                <span style={{ marginLeft: 12 }}> RSUITE ANALYTICS</span>
              </Link>
            </div>
          </Sidenav.Header>
          <Sidenav expanded={expand} defaultOpenKeys={['3']} activeKey={[]} appearance="subtle">
            <Sidenav.Body style={navBodyStyle}>
              <Nav>
                {this.renderNavs()}
                <Nav.Item
                  href="https://github.com/rsuite/rsuite-management-system"
                  icon={<Icon icon="github" />}
                  target="_blank"
                >
                  Github
                </Nav.Item>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
          
        </Sidebar>

        <Container className={containerClasses}>
          
          <Content>{children}</Content>
        </Container>
      </Container>
    );
  }
}
 type State = {
    windowHeight: number,
    expand: boolean
  };

  type Props = {
    children: React.Node
  };

export default Dashboard
