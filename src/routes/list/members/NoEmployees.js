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

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

type Props = {};
type State = {
    showDrawer: boolean
};

class NoEmployees extends React.Component<Props, State> {
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
        const midTitleStyle = { position: 'absolute', width: '204px', height: '28px', left: '737px', top: '563px', color: '#063778'};
        const grayTextStyle = {position: 'absolute',width: '295px',height: '21px',left: '691px',top: '601px'
}
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
                <div className="inner-center">
                    <div className="img-harddrive"><svg width="90" height="68" viewBox="0 0 90 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M88.9862 31.3484L77.5566 1.34586C77.3453 0.791265 76.8137 0.42572 76.2207 0.42572H13.3582C12.7653 0.42572 12.2337 0.791265 12.0223 1.34586L0.592781 31.3484C0.540461 31.4956 0.512557 31.6498 0.509766 31.8053C0.509766 31.8242 0.5 31.8381 0.5 31.857V66.1456C0.5 66.9346 1.1397 67.5743 1.92869 67.5743H87.6503C88.4392 67.5743 89.0789 66.9346 89.0789 66.1456V31.857C89.0789 31.8381 89.0692 31.8242 89.0692 31.8053C89.0664 31.6498 89.0385 31.4956 88.9862 31.3484ZM14.3426 3.28311H75.2364L85.577 30.4283H64.7912C64.0022 30.4283 63.3625 31.068 63.3625 31.857C63.3625 42.1145 55.047 50.43 44.7895 50.43C34.5319 50.43 26.2165 42.1145 26.2165 31.857C26.2165 31.068 25.5768 30.4283 24.7878 30.4283H4.00197L14.3426 3.28311ZM86.2216 64.7169H3.35739V33.2856H23.4065C24.1544 44.545 33.505 53.295 44.7895 53.295C56.0739 53.295 65.4246 44.545 66.1724 33.2856H86.2216V64.7169Z" fill="#004FAC" />
                        </svg>
                    </div>
                    <span style={midTitleStyle}>No Employee added</span>
                    <span style={grayTextStyle}>Add a worker wo start paying with Daipay</span>
                </div>
                   
                </Panel>
                
            </div>
        );
    }
}

export default DataList;
