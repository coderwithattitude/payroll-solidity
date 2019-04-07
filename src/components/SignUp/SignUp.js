import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { drizzleConnect } from 'drizzle-react';
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
      email: ''
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

    this.props.reduxStore.dispatch(handleAddOrg(Object.assign({}, this.state, { admin: this.props.accounts[0] })));
  }

  isDisabled = () => {
    const { orgName, email } = this.state;
    return (orgName === '' ||
                (!this.props.accounts || this.props.accounts[0] === '') ||
                email === ''
                );
  }

   
  componentDidMount() {
  }

    


  render () {
    const { orgName, email } = this.state;
    return(
       
        <div className='show-grid'>
            <FlexboxGrid  justify='center'>
                <Item className='split-item split-left' colspan={12}>
                <div>
                  <Link to='/' style={{ color: 'white' }}>
                    <h1 className='split-header1'>Alkpay</h1>
                  </Link> 
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
                                        <input className= 'form-input' disabled={true} value={ this.props.accounts[0] } placeholder="Detected wallet address" name="admin"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <input className='form-tc' type='checkbox' /><span className='tc'>Terms & Condition</span>  
                                    </FormGroup>
                                    <FormGroup>
                                        <Button disabled={this.isDisabled()} color='green' onClick={this.handleSubmit} style={{width: '361px', height: '52px'}}>CREATE ACCOUNT</Button>
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
  drizzle: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  // console.log(state, ownProps)
  return {};
}

function drizzleMapStateToProps(state, ownProps) {
  // console.log(state, ownProps)
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus
  };
}

//const SignUpContainer = drizzleConnect(SignUp, mapStateToProps);
//export default connect(SignUpContainer);
export default connect(mapStateToProps)(drizzleConnect(SignUp, drizzleMapStateToProps));