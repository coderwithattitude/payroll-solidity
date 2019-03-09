// @flow

import * as React from 'react';
import { Link } from 'react-router';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { handleGetEmployees } from '../../../actions/employee';
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
  HelpBlock
} from 'rsuite';

//import data from './users';

import SearchBar from '../../../components/SearchBar';
import EditCell from '../../../components/EditCell';
import ActionCell from '../../../components/ActionCell';

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

type Props = {};
type State = {
  show: boolean
};

class DataList extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      show: false,
      employees: null
    };
  }


  handleChange = (id, key, value) => {
    const { data } = this.state;
    const nextData = _.clone(data);
    nextData.find(item => item.id === id)[key] = value;
    this.setState({ data: nextData });
  }

  handleEditState = (id) =>{
    //const { data } = this.state;
    const nextData = _.clone(data);
    const activeItem = nextData.find(item => item.id === id);
    activeItem.status = activeItem.status ? null : 'EDIT';
    this.setState({ data: nextData });
  }

  componentDidMount() {
    this.setState({
      employees: this.handleEditState
    });
  }

  
  render() {
    return (
      <div>
        <Panel header={
          <div>
              <span style= {{ display: 'inline-block', marginRight: '30px'}}>
                  <h1>Payroll</h1>
              </span>
              <Button appearance="primary" className="tight-border spread-button bold-font" color="green" placement="left" style={{ verticalAlign: '6px', fontSize: '12px' }}>
                  PAY EMPLOYEES
              </Button>
          </div>}
        >

          <SearchBar/>

          <Table
            height={getHeight(window) - 216}
            data={this.state.data}
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
              <EditCell onChange={this.handleChange} dataKey="name" />
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
       
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    employees: state.employees
  };
}
export default connect(mapStateToProps)(DataList);
