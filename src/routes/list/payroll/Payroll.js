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
    PanelGroup,
} from 'rsuite';

import data from '../members/users';
import DrawerView from '../members/DrawerView';
import SearchBar from '../../../components/SearchBar';
import FooterCell from '../../../components/FooterCell';
import { FooterActionCell, FooterEditCell } from '../../../components/FooterCell';

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


class Payroll extends React.Component<Props, State> {
    constructor() {
        super();
        this.state ={
            showDrawer: false,
        };
    }

    padDataForFooter (data) {
        const paddedData = data || [];
        if (paddedData.length < 1 || paddedData[paddedData.length-1].type !== 'footer') {
            paddedData.push({ type: 'footer' });
        }
        return paddedData;
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
        let total = 0;
        //data.forEach(item => {
        //    total += item.amount;
        //});
        const dataWithFooter = this.padDataForFooter(data);
        
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
                        height={getHeight(window) - 316}
                        data={dataWithFooter}
                        onRowClick={data => {
                            console.log(data);
                        }}
                        setRowHeight={rowData => (rowData.type==='footer') ? 92 : 46}
                    >
                        <Column width={70} align="center" fixed>
                            <HeaderCell>Id</HeaderCell>
                            <FooterCell dataKey="id" dataLength={dataWithFooter.length} />
                        </Column>

                        <Column width={200} fixed>
                            <HeaderCell>Full Name</HeaderCell>
                            <FooterEditCell onChange={this.handleChange} dataKey="firstName" dataLength={dataWithFooter.length} />
                        </Column>


                        <Column width={200}>
                            <HeaderCell>Department</HeaderCell>
                            <FooterEditCell onChange={this.handleChange} dataKey="city" dataLength={dataWithFooter.length} />
                        </Column>

                        <Column width={200}>
                            <HeaderCell>Wallet</HeaderCell>
                            <FooterEditCell onChange={this.handleChange} dataKey="street" dataLength={dataWithFooter.length} footerComponent={
                                <div>
                                    <small>Total to Pay</small><br/>
                                    <h3> { '$ 1000' } </h3>
                                </div>
                            } />
                        </Column>

                        <Column width={100}>
                            <HeaderCell>Hourly rate</HeaderCell>
                            <FooterEditCell onChange={this.handleChange} dataKey="companyName" dataLength={dataWithFooter.length} footerComponent={
                                <div>
                                    <small>Total to Pay</small><br/>
                                    <h3> { '999.5 Dai' } </h3>
                                </div>
                            } />
                        </Column>

                        <Column width={100}>
                            <HeaderCell>Hours</HeaderCell>
                            <FooterEditCell onChange={this.handleChange} dataKey="email" dataLength={dataWithFooter.length} />
                        </Column>

                        <Column width={100}>
                            <HeaderCell>Total</HeaderCell>
                            <FooterCell dataKey="total" dataLength={dataWithFooter.length} />
                        </Column>

                        <Column flexGrow={1}>
                            <HeaderCell>Edit</HeaderCell>
                            <FooterActionCell dataKey="id" onClick={this.handleEditState} dataLength={dataWithFooter.length} footerComponent={
                                <Button
                                    appearance="primary"
                                    className="tight-border spread-button bold-font"
                                    color="green"
                                    style= {{ fontSize: '1em', marginTop: '13px'}}
                                    onClick={() => {
                                        onClick && onClick(rowData.id);
                                    }}
                                >
                                    PAY
                                </Button>
                            } />
                        </Column>
                    </Table>
                </Panel>
                
                    <DrawerView show={this.state.showDrawer} onClose={this.handleCloseDrawer} />
            </div>
        );
    }
}

export default Payroll;

