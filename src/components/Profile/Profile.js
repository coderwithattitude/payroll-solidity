import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import {
  Button,
  Col,
  Container,
  Content,
  FlexboxGrid,
  Icon,
  Grid,
  Nav,
  Navbar,
  DOMHelper,
  Row,
} from 'rsuite';

import { pageview } from '../../tracker';

type State = {
  windowHeight: number
};

class Profile extends React.Component<Props, State> {

    state = {
        logo: '',
        email: "hello@renownfruit.com",
        companyName: "Renownfruit Tech",
        totalWorkers: 200,
        lastPayment: new Date(),
        lastLogin: new Date()

    }

    render () {
        const { totalWorkers, lastPayment, lastLogin, companyName, email } = this.state;
        return (
            <FlexboxGrid className="profile" align="middle" justify="center">
                <div className="content tight-border">
                    <Grid fluid className="inner-content">
                        <Row className="head" >
                            <Col xs={8}>
                                <div className="logo-container">
                                    <Icon icon="logo-analytics" size="lg" className="logo tight-border" style={{fontSize: "8em"}}/>
                                </div>
                            </Col>
                            <Col xs={12} style={{ height: '100%' }}>
                                <FlexboxGrid align="middle" justify="center"  style={{ height: '100%', flexDirection: "column" }} >
                                    <h2>{companyName}</h2>
                                    <h2 className="top-flush"><small>{email}</small></h2>
                                    <div></div>
                                </FlexboxGrid>
                            </Col>
                            <Col xs={4}>
                                <Button appearance="primary" className="spread-button" >Edit</Button>
                            </Col>
                        </Row>
                        <Row className="bottom" gutter={1}>
                            <Col xs={8} className="border-top">
                                <FlexboxGrid align="middle" className="bottom-content" style={{ height: '100%', flexDirection: "column" }} >
                                    <h1 ><small>All workers</small></h1>
                                    <h2 className="top-flush" >{totalWorkers}</h2>
                                </FlexboxGrid>
                            </Col>
                            <Col xs={8} className="border-top middle">
                                <FlexboxGrid align="middle" className="bottom-content" style={{ height: '100%', flexDirection: "column" }} >
                                    <h1 ><small>Last Login</small></h1>
                                    <h2 className="top-flush" >{lastLogin.toDateString()}</h2>
                                </FlexboxGrid>
                            </Col>
                            <Col xs={8}  className="border-top">
                                <FlexboxGrid align="middle" className="bottom-content" style={{ height: '100%', flexDirection: "column" }} >
                                    <h1 ><small>Last Payroll payment</small></h1>
                                    <h2 className="top-flush" >{lastPayment.toDateString()}</h2>
                                </FlexboxGrid>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </FlexboxGrid>
        )
    }
}

export default Profile;