import React from 'react';
import { connect } from 'react-redux';
import { handleAddOrg } from '../../actions/org';
import { drizzleConnect } from "drizzle-react";
import Web3 from 'web3';
import PropTypes from 'prop-types';
import {
    FlexboxGrid, 
    Container, 
    Content, 
    Form, 
    FormGroup,
    ControlLabel,
    Panel,
    Input,
    Button
 } from 'rsuite';

 import store from '../../store';

const { Item } = FlexboxGrid;
class SignUp extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            drizzle: context.drizzle,
            orgName: '',
            wallet: '',
            email: ''

        }

    this.web3Provider = new Web3.providers.HttpProvider('http://localhost:9545')
    this.web3 = new Web3(this.web3Provider)
    }

    handleInputChange = (e) => {
        const { value, name } = e.target;

        this.setState(() => ({
            [name]: value
        }));
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.dispatch(handleAddOrg(this.state));
    }

    
    componentDidMount(){
    
     
       console.log('_wallet',this.state.drizzle.web3.eth.accounts[0]);
        this.setState(() => {
            wallet: store.getState().web3.web3Instance;
        });
    }

    


render () {
    const { orgName, wallet, email } = this.state;
    return(
       
        <div className='show-grid'>
            <FlexboxGrid  justify='center'>
                <Item className='split-item split-left' colspan={12}>
                <div>
                    <h1 className='split-header1'>Alkpay</h1>
                    <h1>Welcome aboard.</h1>
                </div>
                </Item>
                <Item className='split-item split-right' colspan={12}>
                   <FlexboxGrid  justify='center' align='middle'>
                   <Item colspan={12}>
                         <Container>
                        <Content>
                            <Panel header={<h1 className='form-header'> Create a free Account </h1>}>
                                 <Form fluid>
                                    <FormGroup>
                                         <ControlLabel>Organisation</ControlLabel>
                                         <Input className= 'form-input'  onChange={this.handleInputChange}  value={ orgName } placeholder="Enter organisation name" name="Organisation" />
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Email</ControlLabel>
                                        <Input className= 'form-input' onChange={this.handleInputChange} value={ email } placeholder="Enter email address" name="email"/>
                                    </FormGroup>  
                                    <FormGroup>
                                        <ControlLabel>Wallet Address</ControlLabel>
                                        <Input className= 'form-input' onChange={this.handleInputChange} value={ wallet } placeholder="Enter wallet address" name="wallet"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input className='form-tc' type='checkbox' /><span className='tc'>Terms & Condition</span>  
                                    </FormGroup>
                                    <FormGroup>
                                        <Button color='green' onClick={this.handleSubmit} style={{width: '361px', height: '52px'}}>CREATE ACCOUNT</Button>
                                    </FormGroup>
                                </Form>
                            </Panel>
                        </Content>
                    </Container>
                   </Item>
                   </FlexboxGrid>
                   
                </Item>
            </FlexboxGrid>
        </div>
        
    );
}
}

SignUp.contextTypes = {
    drizzle: PropTypes.object
}

const mapStateToProps = state => {
  return {
      accounts: state.accounts
  };
}
const SignUpContainer = drizzleConnect(SignUp, mapStateToProps);
export default SignUpContainer;
//export default connect(mapStateToProps)(SignUp);