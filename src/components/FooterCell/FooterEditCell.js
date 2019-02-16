import React from 'react';
import { Table, Button } from 'rsuite';
import EditCell from '../EditCell';
const { Cell } = Table;

const FooterEditCell = ({ rowIndex, dataLength, footerComponent, ...props }) => {
    if (rowIndex === dataLength-1 ) {
        return (
            <Cell {...props} className='footerCell'>
                { footerComponent &&
                    footerComponent
                }
                { !footerComponent &&
                    ''
                }
            </Cell>
        );
    } else {
        return (
            <EditCell {...props} style={{ padding: '6px 0' }}></EditCell>
        );
    }
};

export default FooterEditCell;