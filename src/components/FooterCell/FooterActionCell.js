import React from 'react';
import { Table, Button } from 'rsuite';
import ActionCell from '../ActionCell';
const { Cell } = Table;

const FooterActionCell = ({ rowIndex, dataLength, ...props }) => {
    if (rowIndex === dataLength-1 ) {
        return (
            <Cell {...props} className='footerCell'>
                Footer
                
            </Cell>
        );
    } else {
        return (
            <ActionCell {...props} style={{ padding: '6px 0' }}></ActionCell>
        );
    }
};

export default FooterActionCell;