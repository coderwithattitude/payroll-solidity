import * as React from 'react';
import { Link } from 'react-router';
import { 
    DatePicker,
    Table,
    Panel,
    DOMHelper,
    IconButton,
    Divider,
    Button,
    Icon
} from 'rsuite';

//import data from '../../routes/list/members/users';
import SearchBar from '../SearchBar';

const { Column, HeaderCell, Cell} = Table;
const { getHeight } = DOMHelper;

type Props = {};
type State = {};

const ActionCell = ({ rowData, dataKey, ...props }) => {
    function handleAction() {
        alert(`id:${rowData[dataKey]}`);
    }
    return (
        <Cell {...props} className="link-group">
            <Button
                color="blue"
                onClick={handleAction}
            >View</Button>
        </Cell>
    );
};

const DeleteCell = ({ rowData, dataKey, ...props }) => {
    function handleAction() {
        alert(`id:${rowData[dataKey]}`);
    }
    return (
        <Cell {...props} className="link-group">
            <IconButton
                appearance="delete"
                onClick={handleAction}
                icon={<Icon icon="trash" />}
            />
           
        </Cell>
    );
};

class History extends React.Component<Props, State> {
    constructor() {
        super();
    }

    

    render() {
        return (
            <div>
                <Panel header={
                    <div>
                        <span style={{ display: 'inline-block', marginRight: '30px' }}>
                            <h1>History</h1>
                        </span>
                        <Button appearance="primary" className="tight-border spread-button bold-font" color="green" placement="left" style={{ verticalAlign: '6px', fontSize: '12px' }} onClick={this.handleShowDrawer}>
                            PAY EMPLOYEES
              </Button>
                    </div>}
                >
                    <SearchBar addAction={() => { }} />

                    <Table
                        height={getHeight(window) - 216}
                      //  data={data}
                      //  onRowClick={data => {
                      //      console.log(data);
                      //  }} 
                    >
                        <Column width={200} fixed>
                            <HeaderCell>Date</HeaderCell>
                            <Cell dataKey="date" />
                        </Column>


                        <Column width={200}>
                            <HeaderCell>Amount Paid</HeaderCell>
                            <Cell dataKey="amountPaid" />
                        </Column>

                        <Column width={200}>
                            <HeaderCell>Number of employees</HeaderCell>
                            <Cell dataKey="employees" />
                        </Column>

                        <Column width={300}>
                            <HeaderCell></HeaderCell>
                            <ActionCell dataKey="View" />
                        </Column>

                        <Column width={300}>
                            <HeaderCell></HeaderCell>
                            <DeleteCell dataKey="delete" />
                        </Column>
                       
                    </Table>
                </Panel>
            </div>
        );
}
}

export default History;