import React from 'react';
import { Button, Col, FlexboxGrid, Grid, Row } from 'rsuite';
import Metamasksvg from '../../images/metamask-fox.svg';


const EthereumComponent = (WrappedComponent) => props => {
    console.log(props)
    if (props.web3) {
        return (<WrappedComponent {...props} />);
    } else {
        return(
            <FlexboxGrid className="backdrop tight-border" align="middle" justify="center">
                <FlexboxGrid.Item colspan={8} className="ethereum-box">
                    <Grid fluid >
                        <Row>
                            <Col xs={6} xsOffset={9} className="logo-box">
                                <img src={Metamasksvg} />
                            </Col>
                            <Col md={16} mdOffset={4}>
                            </Col>
                        </Row>
                    </Grid>

                    <div className="details">
                        <h3>Install Metamask or Ethereum provider to continue</h3>
                        <p>
                            You need to install Metamask or visit from an Ethereum enabled browser to pay your workers with Daipay
                        </p>
                    </div>
                    <Grid fluid className="buttonRow">
                        <Row>
                            <Col xs={16} xsOffset={4}>
                                <a href="https://metamask.io" target="_blank">
                                    <Button block appearance="primary" color="green" className="tight-border">
                                        INSTALL METAMASK
                                    </Button>
                                </a>
                            </Col>
                        </Row>
                    </Grid>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        )
    }
}

export default EthereumComponent;