import React, { Component } from 'react'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import ensureArray from 'ensure-array';
import Breadcrumbs from '@trendmicro/react-breadcrumbs';
class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  state = {
    selected: 'payroll',
    expanded: true
  };

  
  onSelect = (selected) => {
    this.setState({ selected: selected});
  };

  onToggle = (expanded) => {
    this.setState({expanded: expanded});
  };

  pageTitle = {
    'payroll': 'Payroll',
    'history': ['History'],
    'profile': ['Profile']
  }

  renderBreadcrumbs() {
    const { selected } = this.state;
    const list = ensureArray(this.pageTitle[selected]);

    return(
      <Breadcrumbs>
        {list.map((item, index) => (
          <Breadcrumbs.item
              active = {index === list.length -1}
              key = {`${selected}_${index}`}
          >
          {item}
          </Breadcrumbs.item> 
        ))}
      </Breadcrumbs>
    );
  }

  navigate = (pathname) => () => {
    this.setState({ selected: pathname });
  };



  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Dashboard</h1>
            <p><strong>Congratulations {this.props.authData.name}!</strong> If you're seeing this page, you've logged in with your own smart contract successfully.</p>
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard
