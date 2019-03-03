// @flow

import * as React from 'react';
import { Link } from 'react-router';
import {
    Input,
    InputGroup,
    Table,
    Icon,
    ButtonToolbar,
    Button,
    ControlLabel,
    IconButton,
    DOMHelper,
    Divider,
    Dropdown,
    Modal,
    Form,
    FormGroup,
    FormControl,
} from 'rsuite';

const { Header, Body, Title, Footer } = Modal;

type State = {
  show: boolean
};

class SearchBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            addActon: this.props.addActon || function () {},
            show: false
        };
    }


    handleShowModal = () => {
        this.setState({
        show: true
        });
    };

    handleCloseModal = () => {
        this.setState({
        show: false
        });
    };


    render () {
        return (

            <div className="table-toolbar search-bar">
    <Modal size={'xs'} show={this.state.show} onHide={this.handleCloseModal} backdrop={'static'}>
            <Header>
              <Title>Add Employee</Title>
              <Divider />
            </Header>
            <Body>
              <Form fluid>
                <FormGroup>
                  <ControlLabel>First Name</ControlLabel>
                  <FormControl placeholder="Enter first name" name="firstname" />
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Last name</ControlLabel>
                  <FormControl placeholder="Enter last name" name="lastname"/>
                </FormGroup>
               
                  
                  
                <FormGroup>
                  <Dropdown title="Department" appearance="default">
                  <Dropdown.Item>Software Engineering</Dropdown.Item>
                  <Dropdown.Item>Marketing</Dropdown.Item>
                  <Dropdown.Item>admin</Dropdown.Item>
                  <Dropdown.Item>management</Dropdown.Item>
                </Dropdown></FormGroup>
                <FormGroup>
                  <ControlLabel>Wallet Address</ControlLabel>
                  <FormControl placeholder="enter your ethereum wallet address" name="wallet" />
                </FormGroup>
                  <FormGroup>
                  <ControlLabel>Hourly Rate($)</ControlLabel>
                  <FormControl placeholder="enter hourly rate" name="hourlyrate"/>
                </FormGroup>
               
                
              </Form>
            </Body>
            <Footer>
              <Button onClick={this.handleCloseModal} color="green" appearance="primary" style={{ background: 'linear-gradient(180deg, #1FC164 0%, #12A551 100%)', width: '127px', height: '42px' }}>
                Ok
            </Button>
            </Footer>
          </Modal>
                <div className="inner-right">
                    <div style={{display: 'inline-block'}}>
                        <InputGroup inside className="tight-border">
                            <Input placeholder="Search" />
                            <InputGroup.Addon>
                                <Icon icon="search" />
                            </InputGroup.Addon>
                        </InputGroup>
                    </div>

                    <Button appearance="primary" placement="left" onClick={this.handleShowModal} className="tight-border spread-button deep-blue bold-font">
                        <Icon icon="plus" style={{ marginRight: '12px' }}  />
                        ADD EMPLOYEE
                    </Button>
                </div>
            </div>
        );
    }
}

export default SearchBar;