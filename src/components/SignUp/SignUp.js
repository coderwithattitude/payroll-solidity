import React from 'react';
import { connect } from 'react-redux';
//import { handleAddOrg } from '../../actions/org';
import {
    FlexboxGrid, 
    Container, 
    Content, 
    Form, 
    FormGroup,
    ControlLabel,
    Panel,
    Input
 } from 'rsuite';

const { Item } = FlexboxGrid;
class SignUp extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            orgName: '',
            wallet: '',
            email: ''

        }
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


render () {
    const { orgName, wallet, email } = this.state;
    return(
        <div className='show-grid'>
            <FlexboxGrid  justify='center'>
                <Item className='split-item split-left' colspan={12}>
                    <h1><strong>Alkpay</strong></h1>
                    <br/>
                    <h2>Welcome aboard.</h2>
                </Item>
                <Item className='split-item split-right' colspan={12}>
                   <FlexboxGrid  justify='center' align='middle'>
                   <Item colspan={12}>
                         <Container>
                        <Content>
                            <Panel header={<h1> Create a free Account </h1>}>
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
                                        <Input className= 'form-input' disabled={true} onChange={this.handleInputChange} value={ wallet } placeholder="enter your ethereum wallet address" name="wallet" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input className= 'form-tc' type='checkbox'/>
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

export default SignUp;