// @flow

import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { handleAddEmployee } from '../../actions/employee';
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


class SearchBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            show: false,
            firstName: '',
            lastName: '',
            wallet: '',
            department: '',
            hourlyRate: 0,
        };
      console.log('state', this.state);
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

    handleInputChange = (e) => {
      const { value, name} = e.target;

      this.setState(() => ({
        [name] : value
      }));
    }

    isDisabled = () => {
      const { firstName, lastName, department, hourlyRate, wallet } = this.state;
      return (firstName === '' ||
              lastName === '' ||
              department === '' ||
              hourlyRate === '' ||
              wallet === '' 
              );
    }

    handleSubmit = (e) => {
      e.preventDefault();

      this.props.dispatch(handleAddEmployee(this.state));
    }
    render () {
      const { firstName, lastName, department, hourlyRate, wallet } = this.state;
      console.log('disabled',this.isDisabled);
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
                  <Input onChange={this.handleInputChange} value={ firstName } placeholder="Enter first name" name="firstName" />
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Last name</ControlLabel>
                  <Input onChange={this.handleInputChange} value={ lastName } placeholder="Enter last name" name="lastName"/>
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
                  <Input onChange={this.handleInputChange} value={ wallet } placeholder="enter your ethereum wallet address" name="wallet" />
                </FormGroup>
                  <FormGroup>
                  <ControlLabel>Hourly Rate($)</ControlLabel>
                  <Input onChange={this.handleInputChange} placeholder="enter hourly rate" name="hourlyrate"/>
                </FormGroup>
               
                
              </Form>
            </Body>
            <Footer>
              <Button type="submit" disabled={this.isDisabled} color="green" appearance="primary" style={{ background: 'linear-gradient(180deg, #1FC164 0%, #12A551 100%)', width: '127px', height: '42px' }}>
                OK
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