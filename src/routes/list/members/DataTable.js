// @flow

import * as React from 'react';
import { Link } from 'react-router';
import * as _ from 'lodash';
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

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

type Props = {};
type State = {
  showDrawer: boolean
};

export const EditCell = ({ rowData, dataKey, onChange, ...props }) => {
  const editing = rowData.status === 'EDIT';
  return (
    <Cell {...props} className={editing ? 'table-content-editing' : ''}>
      {editing ? (
        <input
          className="rs-input"
          defaultValue={rowData[dataKey]}
          onChange={event => {
            onChange && onChange(rowData.id, dataKey, event.target.value);
          }}
        />
      ) : (
          <span className="table-content-edit-span">{rowData[dataKey]}</span>
        )}
    </Cell>
  );
};

const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
  return (
    <Cell {...props} style={{ padding: '6px 0' }}>
      <Button
        appearance="link"
        onClick={() => {
          onClick && onClick(rowData.id);
        }}
      >
        {rowData.status === 'EDIT' ? 'Save' : 'Edit'}
      </Button>
    </Cell>
  );
};

class DataList extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      showDrawer: false,
      
    };
    //this.handleEditState = this.handleEditState.bind(this);
  }

  handleChange = (id, key, value) => {
    const { data } = this.state;
    const nextData = _.clone(data);
    nextData.find(item => item.id === id)[key] = value;
    this.setState({ data: nextData });
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

  handleEditState = (id) =>{
    //const { data } = this.state;
    const nextData = _.clone(data);
    const activeItem = nextData.find(item => item.id === id);
    activeItem.status = activeItem.status ? null : 'EDIT';
    this.setState({ data: nextData });
  }

  
  render() {
    return (
      <div>
        <Panel header={<h1>Payroll</h1>}>
          <div className="table-toolbar">
            <ButtonToolbar className="inner-left">
              <Button appearance="primary" placement="left" onClick={this.handleShowDrawer}>
                Add Employee
              </Button>
              <Button appearance="primary" color="green" placement="left" onClick={this.handleShowDrawer}>
                Pay Employees
              </Button>
            </ButtonToolbar>

            <div className="inner-right">
              <InputGroup inside>
                <Input placeholder="Search" />
                <InputGroup.Addon>
                  <Icon icon="search" />
                </InputGroup.Addon>
              </InputGroup>
            </div>
          </div>

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
              <HeaderCell>Full Name</HeaderCell>
              <EditCell onChange={this.handleChange} dataKey="firstName" />
            </Column>

        
            <Column width={200}>
              <HeaderCell>City</HeaderCell>
              <EditCell onChange={this.handleChange} dataKey="city" />
            </Column>

            <Column width={200}>
              <HeaderCell>Wallet</HeaderCell>
              <EditCell onChange={this.handleChange} dataKey="street" />
            </Column>

            <Column width={300}>
              <HeaderCell>Hourly rate</HeaderCell>
              <EditCell onChange={this.handleChange} dataKey="companyName" />
            </Column>

            <Column width={300}>
              <HeaderCell>Hours per week</HeaderCell>
              <EditCell onChange={this.handleChange} dataKey="email" />
            </Column>
            <Column flexGrow={1}>
            <HeaderCell>Edit</HeaderCell>
            <ActionCell dataKey="id" onClick={this.handleEditState} />
            </Column>
          </Table>
        </Panel>
        <DrawerView show={this.state.showDrawer} onClose={this.handleCloseDrawer} />
      </div>
    );
  }
}

export default DataList;
