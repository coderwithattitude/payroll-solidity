import React from 'react';
import { Button, Col, FlexboxGrid, Grid, Row } from 'rsuite';
import Metamasksvg from '../../images/metamask-fox.svg';

const hasWeb3 = props => {
    return props.web3 || (props.drizzle && props.drizzle.web3);
}

const hasWeb3Account = props => {
    return (props.web3 && props.web3.eth.accounts.length > 0) || (props.accounts && props.accounts.length > 0) || (props.drizzle && props.drizzle.accounts && props.drizzle.accounts.length > 0);
}

const enableProvider = props => e => {
    const web3 = props.web3 || (props.drizzle && props.drizzle.web3);
    if (web3 && web3.currentProvider) {
        web3.currentProvider.enable();
    } else {
        window && window.reload();
    }
}

const EthereumComponent = (WrappedComponent) => props => {
    if (hasWeb3(props) && hasWeb3Account(props)) {
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
                        { !hasWeb3(props) &&
                            <p>
                                You need to install Metamask or visit from an Ethereum enabled browser to pay your workers with Daipay
                            </p>
                        }
                        { hasWeb3(props) && !hasWeb3Account(props) &&
                            <p>
                                You need to unlock Metamask or connect your account to pay your workers with Daipay
                            </p>
                        }
                    </div>
                    <Grid fluid className="buttonRow">
                        <Row>
                            <Col xs={16} xsOffset={4}>
                                { !hasWeb3(props) &&
                                    <a href="https://metamask.io" target="_blank">
                                        <Button block appearance="primary" color="green" className="tight-border">
                                            INSTALL METAMASK
                                        </Button>
                                    </a>
                                }
                                { hasWeb3(props) && !hasWeb3Account(props) &&
                                    <Button block appearance="primary" color="green" className="tight-border" onClick={enableProvider(props)}>
                                        UNLOCL ACCOUNTS
                                    </Button>
                                }
                            </Col>
                        </Row>
                    </Grid>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        )
    }
}

export default EthereumComponent;