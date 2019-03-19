import React from 'react';
import { FlexboxGrid } from 'rsuite';


const EthereumComponent = (WrappedComponent) => props => {
    console.log(windows)
    console.log(props)
    if (props.web3) {
        return (<WrappedComponent {...props} />);
    } else {
        return(
            <FlexboxGrid className="backdrop">
                <FlexboxGrid.Item>
                    Watcher
                </FlexboxGrid.Item>
            </FlexboxGrid>
        )
    }
}

export default EthereumComponent;