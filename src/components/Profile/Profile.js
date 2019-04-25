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
        logo: ''
    }

    render () {
        return (
            <FlexboxGrid className="profile" align="middle" justify="center">
                <div className="content tight-border">
                    <Grid fluid className="inner-content">
                        <Row className="head" >
                            <Col xs={4}>
                                <Icon icon="logo-analytics" size="lg" className="logo" />
                            </Col>
                            <Col xs={15} style={{ height: '100%' }}>
                                <FlexboxGrid align="middle" justify="center"  style={{ height: '100%' }}>
                                    <h2>Weeee</h2>
                                </FlexboxGrid>
                            </Col>
                            <Col xs={5}>
                                <Button>Weeee</Button>
                            </Col>
                        </Row>
                        <Row className="bottom" gutter={1}>
                            <Col xs={8} xsOffset={4}>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </FlexboxGrid>
        )
    }
}

export default Profile;