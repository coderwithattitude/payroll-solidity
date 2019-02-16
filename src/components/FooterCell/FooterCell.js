import React from 'react';
import { Table, Button } from 'rsuite';
const { Cell } = Table;

const FooterCell = ({ rowIndex, dataLength, footerComponent, ...props }) => {
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
            <Cell {...props} style={{ padding: '6px 0' }}></Cell>
        );

    }
};

export default FooterCell;