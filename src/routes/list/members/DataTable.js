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
  Notification,
  Modal
} from 'rsuite';

import data from './users';
import DrawerView from './DrawerView';
import SearchBar from '../../../components/SearchBar';
import EditCell from '../../../components/EditCell';
import ActionCell from '../../../components/ActionCell';

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
      show: false,
      
    };
  }


  handleChange = (id, key, value) => {
    const { data } = this.state;
    const nextData = _.clone(data);
    nextData.find(item => item.id === id)[key] = value;
    this.setState({ data: nextData });
  }

  handleShowModal = () => {
    this.setState({
      show: true
    });
  };

  handleCloseModal = () => {
    this.setState({
      show: false
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
        <Panel header={
          <div>
              <span style= {{ display: 'inline-block', marginRight: '30px'}}>
                  <h1>Payroll</h1>
              </span>
              <Button appearance="primary" className="tight-border spread-button bold-font" color="green" placement="left" style={{ verticalAlign: '6px', fontSize: '12px' }} onClick={this.handleShowModal}>
                  PAY EMPLOYEES
              </Button>
          </div>}
        >
          <Modal show={this.state.show} onHide={this.handleCloseModal} backdrop={'static'}>
            <Modal.Header>
              <Modal.Title>Add Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleCloseModal} appearance="primary">
                Ok
            </Button>
              <Button onClick={this.handleCloseModal} appearance="subtle">
                Cancel
            </Button>
            </Modal.Footer>
          </Modal>

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
