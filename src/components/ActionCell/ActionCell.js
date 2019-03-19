import React from 'react';
import { Table, Button } from 'rsuite';
const { Cell } = Table;

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

export default ActionCell;