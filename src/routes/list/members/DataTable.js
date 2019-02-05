// @flow

import * as React from 'react';
import { Link } from 'react-router';
import {
  Input,
  InputGroup,
  Breadcrumb,
  Table,
  Panel,
  Icon,
  ButtonToolbar,
  Button,
  IconButton,
  Navbar,
  DOMHelper,
  Notification
} from 'rsuite';

import data from './users';
import DrawerView from './DrawerView';
import SearchBar from '../../../components/SearchBar';

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

type Props = {};
type State = {
  showDrawer: boolean
};

class DataList extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      showDrawer: false
    };
  }
  handleShowDrawer = () => {
    this.setState({
      showDrawer: true
    });
  };
  handleCloseDrawer = () => {
    this.setState({
      showDrawer: false
    });
  };
  render() {
    return (
      <div>
        <Panel header={
          <div>
              <span style= {{ display: 'inline-block', marginRight: '30px'}}>
                  <h1>Payroll</h1>
              </span>
              <Button appearance="primary" className="tight-border spread-button bold-font" color="green" placement="left" style={{ verticalAlign: '6px', fontSize: '12px' }} onClick={this.handleShowDrawer}>
                  PAY EMPLOYEES
              </Button>
          </div>}
        >
          <SearchBar addAction={()=>{}}/>

          <Table
            height={getHeight(window) - 216}
            data={data}
            onRowClick={data => {
              console.log(data);
            }}
          >
            <Column width={70} align="center" fixed>
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="id" />
            </Column>

            <Column width={200} fixed>
              <HeaderCell>First Name</HeaderCell>
              <Cell dataKey="firstName" />
            </Column>

            <Column width={200}>
              <HeaderCell>Last Name</HeaderCell>
              <Cell dataKey="lastName" />
            </Column>

            <Column width={200}>
              <HeaderCell>City</HeaderCell>
              <Cell dataKey="city" />
            </Column>

            <Column width={200}>
              <HeaderCell>Wallet</HeaderCell>
              <Cell dataKey="street" />
            </Column>

            <Column width={300}>
              <HeaderCell>Hourly rate</HeaderCell>
              <Cell dataKey="companyName" />
            </Column>

            <Column width={300}>
              <HeaderCell>Hours per week</HeaderCell>
              <Cell dataKey="email" />
            </Column>
          </Table>
        </Panel>
        <DrawerView show={this.state.showDrawer} onClose={this.handleCloseDrawer} />
      </div>
    );
  }
}

export default DataList;
