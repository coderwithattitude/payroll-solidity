import React, { Component } from 'react'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';

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
