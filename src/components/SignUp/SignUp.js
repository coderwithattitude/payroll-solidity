import React from 'react';
import { connect } from 'react-redux';
import { handleAddOrg } from '../../actions/org';
import {
    FlexboxGrid, 
    Container, 
    Content, 
    Form, 
    FormGroup,
    ControlLabel,
    Panel,
    Button
 } from 'rsuite';



const { Item } = FlexboxGrid;
class SignUp extends React.Component<Props, State> {

    constructor(props: Prop) {
        super(props);
        
        this.state = {
            orgName: '',
            email: '',
            wallet: ''
        };
        

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

   
   componentDidMount() {
       const { web3 } = window;
       let _wallet;
       web3.eth.getAccounts((err, accounts) => this.setState({wallet: accounts[0]}));
    }

    


render () {
    const { orgName, email, wallet } = this.state;
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
                                         <input className= 'form-input'  onChange={this.handleInputChange}  value={ orgName } placeholder="Enter organisation name" name="orgName" />
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Email</ControlLabel>
                                        <input className= 'form-input' onChange={this.handleInputChange} value={ email } placeholder="Enter email address" name="email"/>
                                    </FormGroup>  
                                    <FormGroup>
                                        <ControlLabel>Wallet Address</ControlLabel>
                                        <input className= 'form-input' disabled={true} value={ wallet } placeholder="Enter wallet address" name="wallet"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <input className='form-tc' type='checkbox' /><span className='tc'>Terms & Condition</span>  
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

function mapStateToProps(state, ownProps) {
  return {};
}

//const SignUpContainer = drizzleConnect(SignUp, mapStateToProps);
//export default connect(SignUpContainer);
export default connect(mapStateToProps)(SignUp);