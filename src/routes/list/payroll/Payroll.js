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

import data from '../members/users';
import DrawerView from '../members/DrawerView';
import SearchBar from '../../../components/SearchBar';

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

type Props = {};
type State = {
    showDrawer: boolean
};

const thousands = value => `${value}`.replace(/(?=(?!(\b))(\d{3})+$)/g, '$1,');

const NumberCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props}>{thousands(rowData[dataKey])}</Cell>
);

const FooterSummary = ({ title, summary }) => (
    <div>
        <label>{title}</label>
        <div
            style={{
                fontSize: 18,
                color: '#2eabdf'
            }}
        >
            {thousands(summary)}
        </div>
    </div>
);

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

class Payroll extends React.Component<Props, State> {
    constructor() {
        super();
        this.state ={
            showDrawer: false,
        };
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

    handleEditState = (id) => {
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
                        <span style={{ display: 'inline-block', marginRight: '30px' }}>
                            <h1>Payment Information Preview</h1>
                        </span>
                        <Button appearance="primary" className="tight-border spread-button bold-font" color="blue" placement="right" style={{ verticalAlign: '6px', fontSize: '12px' }} onClick={this.handleShowDrawer}>
                            ADD EMPLOYEE
              </Button>
                    </div>}
                >
                    

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
                            <HeaderCell>Department</HeaderCell>
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
                            <HeaderCell>Hours</HeaderCell>
                            <EditCell onChange={this.handleChange} dataKey="email" />
                        </Column>
                        <Column width={300}>
                            <HeaderCell>Total</HeaderCell>
                            <Cell dataKey="total" />
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

export default Payroll;

